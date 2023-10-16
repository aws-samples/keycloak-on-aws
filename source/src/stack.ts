import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Stack, StackProps, CfnParameter, CfnParameterProps, Fn, Aws, Duration,} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { KeyCloak, KeycloakVersion } from 'cdk-keycloak';

export class SolutionStack extends Stack {
  private _paramGroup: { [grpname: string]: CfnParameter[]} = {}

  protected setDescription(description: string) { this.templateOptions.description = description; }
  protected makeParam(id: string, props?: CfnParameterProps): CfnParameter { return new CfnParameter(this, id, props); }
  protected addGroupParam(props: { [key: string]: CfnParameter[]}): void {
    for (const key of Object.keys(props)) {
      const params = props[key];
      this._paramGroup[key] = params.concat(this._paramGroup[key] ?? []);
    }
    this._setParamGroups();
  }
  private _setParamGroups(): void {
    if (!this.templateOptions.metadata) { this.templateOptions.metadata = {}; }
    const mkgrp = (label: string, params: CfnParameter[]) => {
      return {
        Label: { default: label },
        Parameters: params.map(p => {
          return p ? p.logicalId : '';
        }).filter(id => id),
      };
    };
    this.templateOptions.metadata['AWS::CloudFormation::Interface'] = {
      ParameterGroups: Object.keys(this._paramGroup).map(key => mkgrp(key, this._paramGroup[key]) ),
    };
  }
}

interface KeycloakStackProps extends StackProps {
  readonly auroraServerlessV2?: boolean;
  readonly fromExistingVPC?: boolean;
}

interface KeycloakSettings {
  certificateArn: string;
  hostname: string;
  vpc?: ec2.IVpc;
  publicSubnets?: ec2.SubnetSelection;
  privateSubnets?: ec2.SubnetSelection;
  databaseSubnets?: ec2.SubnetSelection;
  databaseInstanceType?: ec2.InstanceType;
}

export class KeycloakStack extends SolutionStack {
  private _keycloakSettings: KeycloakSettings = { certificateArn: '', hostname: '' };

  constructor(scope: Construct, id: string, props: KeycloakStackProps = {}) {
    super(scope, id, props);

    const dbMsg = props.auroraServerlessV2 ? 'using aurora serverless v2' : 'rds mysql';
    const vpcMsg = props.fromExistingVPC ? 'existing vpc' : 'new vpc';

    this.setDescription(`(SO8021) - Deploy keycloak ${dbMsg} with ${vpcMsg}. template version: ${process.env.VERSION}`);

    const certificateArnParam = this.makeParam('CertificateArn', {
      type: 'String',
      description: 'Certificate Arn for Application Load Balancer',
      minLength: 5,
    });

    this.addGroupParam({ 'Application Load Balancer Settings': [certificateArnParam] });

    this._keycloakSettings.certificateArn = certificateArnParam.valueAsString;
    
    const hostnameParam = this.makeParam('Hostname', {
      type: 'String',
      description: 'Hostname for Keycloak server',
      minLength: 5,
    });

    this.addGroupParam({ 'Keycloak Hostname Settings': [hostnameParam] });

    this._keycloakSettings.hostname = hostnameParam.valueAsString;

    if (!props.auroraServerlessV2) {
      const databaseInstanceType = this.makeParam('DatabaseInstanceType', {
        type: 'String',
        description: 'Instance type to be used for the core instances',
        allowedValues: INSTANCE_TYPES,
        default: 'r5.large',
      });
      this.addGroupParam({ 'Database Instance Settings': [databaseInstanceType] });
      this._keycloakSettings.databaseInstanceType = new ec2.InstanceType(databaseInstanceType.valueAsString);
    }

    if (props.fromExistingVPC) {
      const vpcIdParam = this.makeParam('VpcId', {
        type: 'AWS::EC2::VPC::Id',
        description: 'Your VPC Id',
      });
      const pubSubnetsParam = this.makeParam('PubSubnets', {
        type: 'List<AWS::EC2::Subnet::Id>',
        description: 'Public subnets (Choose two)',
      });
      const privSubnetsParam = this.makeParam('PrivSubnets', {
        type: 'List<AWS::EC2::Subnet::Id>',
        description: 'Private subnets (Choose two)',
      });
      const dbSubnetsParam = this.makeParam('DBSubnets', {
        type: 'List<AWS::EC2::Subnet::Id>',
        description: 'Database subnets (Choose two)',
      });
      this.addGroupParam({ 'VPC Settings': [vpcIdParam, pubSubnetsParam, privSubnetsParam, dbSubnetsParam] });

      const azs = ['a', 'b'];
      const vpc = ec2.Vpc.fromVpcAttributes(this, 'VpcAttr', {
        vpcId: vpcIdParam.valueAsString,
        vpcCidrBlock: Aws.NO_VALUE,
        availabilityZones: azs,
        publicSubnetIds: azs.map((_, index) => Fn.select(index, pubSubnetsParam.valueAsList)),
        privateSubnetIds: azs.map((_, index) => Fn.select(index, privSubnetsParam.valueAsList)),
        isolatedSubnetIds: azs.map((_, index) => Fn.select(index, dbSubnetsParam.valueAsList)),
      });

      Object.assign(this._keycloakSettings, {
        vpc,
        publicSubnets: { subnets: vpc.publicSubnets },
        privateSubnets: { subnets: vpc.privateSubnets },
        databaseSubnets: { subnets: vpc.isolatedSubnets },
      });
    }

    const minContainersParam = this.makeParam('MinContainers', {
      type: 'Number',
      description: 'minimum containers count',
      default: 2,
      minValue: 2,
    });
    const maxContainersParam = this.makeParam('MaxContainers', {
      type: 'Number',
      description: 'maximum containers count',
      default: 10,
      minValue: 2,
    });
    const targetCpuUtilizationParam = this.makeParam('AutoScalingTargetCpuUtilization', {
      type: 'Number',
      description: 'Auto scaling target cpu utilization',
      default: 75,
      minValue: 0,
    });
    this.addGroupParam({ 'AutoScaling Settings': [minContainersParam, maxContainersParam, targetCpuUtilizationParam] });

    const javaOptsParam = this.makeParam('JavaOpts', {
      type: 'String',
      description: 'JAVA_OPTS environment variable',
      default: '-server -Xms1024m -Xmx1638m'
    });
    this.addGroupParam({ 'Environment variable': [javaOptsParam] });

    new KeyCloak(this, 'KeyCloak', {
      vpc: this._keycloakSettings.vpc,
      publicSubnets: this._keycloakSettings.publicSubnets,
      privateSubnets: this._keycloakSettings.privateSubnets,
      databaseSubnets: this._keycloakSettings.databaseSubnets,
      certificateArn: this._keycloakSettings.certificateArn,
      auroraServerlessV2: props.auroraServerlessV2,
      databaseInstanceType: this._keycloakSettings.databaseInstanceType,
      stickinessCookieDuration: Duration.days(7),
      nodeCount: minContainersParam.valueAsNumber,
      autoScaleTask: {
        min: minContainersParam.valueAsNumber,
        max: maxContainersParam.valueAsNumber,
        targetCpuUtilization: targetCpuUtilizationParam.valueAsNumber,
      },
      env: {
        JAVA_OPTS: javaOptsParam.valueAsString,
      },
      keycloakVersion: KeycloakVersion.of('16.1.1'),
      hostname: this._keycloakSettings.hostname,
    });
  }

}

const INSTANCE_TYPES = [
'r5.large',
'r5.xlarge',
'r5.2xlarge',
'r5.4xlarge',
'r5.8xlarge',
'r5.12xlarge',
'r5.16xlarge',
'r5.24xlarge',
't3.small',
't3.medium'
];
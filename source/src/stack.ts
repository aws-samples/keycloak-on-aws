import * as ec2 from '@aws-cdk/aws-ec2';
import { Construct, Stack, StackProps, CfnParameter, CfnParameterProps, Fn, Aws, Duration } from '@aws-cdk/core';
import { KeyCloak } from 'cdk-keycloak';

export class SolutionStack extends Stack {
  protected setDescription(description: string) { this.templateOptions.description = description; }
  protected makeParam(id: string, props?: CfnParameterProps): CfnParameter { return new CfnParameter(this, id, props); }
  protected groupParam(props: { [key: string]: CfnParameter[]}): void {
    const mkgrp = (label: string, params: CfnParameter[]) => {
      return {
        Label: { default: label },
        Parameters: params.map(p => {
          return p ? p.logicalId : '';
        }).filter(id => id),
      };
    };
    this.templateOptions.metadata = {
      'AWS::CloudFormation::Interface': {
        ParameterGroups: Object.keys(props).map(key => mkgrp(key, props[key]) ),
      },
    };
  }
}

interface KeycloakStackProps extends StackProps {
  readonly auroraServerless?: boolean;
}

export class KeycloakFromExistingVPC extends SolutionStack {
  constructor(scope: Construct, props: KeycloakStackProps = {}) {
    const id = props.auroraServerless ? 'keycloak-aurora-serverless-from-existing-vpc': 'keycloak-from-existing-vpc';

    super(scope, id, props);

    this.setDescription('Deploy keycloak from an existing vpc');

    const certificateArnParam = this.makeParam('CertificateArn', {
      type: 'String',
      description: 'Certificate Arn for ALB',
      minLength: 5,
    });
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
    const nodeCountParam = this.makeParam('NodeCount', {
      type: 'Number',
      description: 'Number of instances',
      default: 4,
    });

    this.groupParam({
      'ALB Settings': [certificateArnParam],
      'VPC Settings': [vpcIdParam, pubSubnetsParam, privSubnetsParam, dbSubnetsParam],
      'App Settings': [nodeCountParam],
    });

    const azs = ['a', 'b'];
    const vpc = ec2.Vpc.fromVpcAttributes(this, 'VpcAttr', {
      vpcId: vpcIdParam.valueAsString,
      vpcCidrBlock: Aws.NO_VALUE,
      availabilityZones: azs,
      publicSubnetIds: azs.map((_, index) => Fn.select(index, pubSubnetsParam.valueAsList)),
      privateSubnetIds: azs.map((_, index) => Fn.select(index, privSubnetsParam.valueAsList)),
      isolatedSubnetIds: azs.map((_, index) => Fn.select(index, dbSubnetsParam.valueAsList)),
    });

    new KeyCloak(this, 'KeyCloak', {
      vpc,
      publicSubnets: { subnets: vpc.publicSubnets },
      privateSubnets: { subnets: vpc.privateSubnets },
      databaseSubnets: { subnets: vpc.isolatedSubnets },
      certificateArn: certificateArnParam.valueAsString,
      auroraServerless: props.auroraServerless,
      nodeCount: nodeCountParam.valueAsNumber,
      stickinessCookieDuration: Duration.days(7),
    });
  }
}

export class KeycloakFromNewVPC extends SolutionStack {
  constructor(scope: Construct, props: KeycloakStackProps = {}) {
    const id = props.auroraServerless ? 'keycloak-aurora-serverless-from-new-vpc': 'keycloak-from-new-vpc';

    super(scope, id, props);

    this.setDescription('Deploy keycloak from a new vpc');

    const certificateArnParam = this.makeParam('CertificateArn', {
      type: 'String',
      description: 'CertificateArn for ALB',
      minLength: 5,
    });
    const nodeCountParam = this.makeParam('NodeCount', {
      type: 'Number',
      description: 'Number of instances',
      default: 4,
    });

    this.groupParam({
      'ALB Settings': [certificateArnParam],
      'App Settings': [nodeCountParam],
    });

    new KeyCloak(this, 'KeyCloak', {
      certificateArn: certificateArnParam.valueAsString,
      auroraServerless: props.auroraServerless,
      stickinessCookieDuration: Duration.days(7),
    });
  }
}

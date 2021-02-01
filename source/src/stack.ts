import * as ec2 from '@aws-cdk/aws-ec2';
import { Construct, Stack, StackProps, CfnParameter, CfnParameterProps, Fn, Aws } from '@aws-cdk/core';
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

export class MyStack extends SolutionStack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    this.setDescription('This is description');

    const certificateArnParam = this.makeParam('CertificateArn', {
      type: 'String',
      description: 'CertificateArn for ALB',
      minLength: 5,
    });
    const vpcIdParam = this.makeParam('VpcId', { type: 'AWS::EC2::VPC::Id' });
    const pubSubnetsParam = this.makeParam('PubSubnets', { type: 'List<AWS::EC2::Subnet::Id>' });
    const privSubnetsParam = this.makeParam('PrivSubnets', { type: 'List<AWS::EC2::Subnet::Id>' });

    this.groupParam({
      'ACM Settings for ALB': [certificateArnParam],
      'VPC Settings': [vpcIdParam, pubSubnetsParam, privSubnetsParam],
    });

    const azs = ['a', 'b'];
    const vpc = ec2.Vpc.fromVpcAttributes(this, 'VpcAttr', {
      vpcId: vpcIdParam.valueAsString,
      vpcCidrBlock: Aws.NO_VALUE,
      availabilityZones: azs,
      publicSubnetIds: azs.map((_, index) => Fn.select(index, pubSubnetsParam.valueAsList)),
      privateSubnetIds: azs.map((_, index) => Fn.select(index, privSubnetsParam.valueAsList)),
    });

    new KeyCloak(this, 'KeyCloak', {
      certificateArn: certificateArnParam.valueAsString,
      vpc,
      autoraServerless: true,
    });
  }
}

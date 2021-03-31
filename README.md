# Keycloak on AWS

[![Build](https://github.com/aws-samples/keycloak-on-aws/actions/workflows/build.yml/badge.svg)](https://github.com/aws-samples/keycloak-on-aws/actions/workflows/build.yml)

[中文](./README.zh.md)

This is a solution for deploying [Keycloak](https://www.keycloak.org/) to AWS with high availability. Keycloak is a single sign-on (SSO) solution for web applications and RESTful web services. Keycloak's goal is to simplify security so that application developers can easily protect applications and services already deployed in their organizations. Out of the box, Keycloak provides security features that developers would normally have to write for themselves and can be easily customized for the individual needs of the organization. Keycloak provides a customizable user interface for login, registration, administration and account management. You can also use Keycloak as an integration platform to hook into existing LDAP and Active Directory servers. You can also delegate authentication to third-party identity providers, such as Facebook and Google+.

## Architecture diagram

![architecture](assets/01-keycloak-on-aws-architecture.svg)

1. NAT Gateway serves as the public access outlet for the private subnet.
2. Application Load Balancer distributes traffic to the AWS ECS Fargate application layer service. In addition, ALB also enables Sticky Sessions to implement distributed sessions. For more details, please refer to [Keycloak documentation](https://www.keycloak.org/docs/latest/server_installation/index.html#sticky-sessions).
3. You can choose Amazon Aurora Serverless to reduce costs or Amazon RDS MySQL for the database layer.
4. Both the database account password and the Keycloak administrator login account password are automatically generated using AWS Secrets Management to ensure security.
You will need to provide an AWS Certificate Manager certificate for Arn to provide HTTPS access to the ALB

## AWS CloudFormation Deployment Link

| quickstart link (Global Region)                                                                                                                                                                                                                          | description                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [keycloak-aurora-serverless-from-existing-vpc](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template) | Deploying AuroraServerless from an Existing VPC as a Keycloak for the database |
| [keycloak-aurora-serverless-from-new-vpc](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-new-vpc.template)           | New VPC Deployment AuroraServerless for database Keycloak                      |
| [keycloak-from-existing-vpc](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-from-existing-vpc.template)                                     | Deploying RDS MySQL from an existing VPC as the Keycloak for the database      |
| [keycloak-from-new-vpc](https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-from-new-vpc.template)                                               | New VPC Deploying RDS MySQL as Keycloak for Database                           |

| quickstart link (China Region)                                                                                                                                                                                                                                        | description                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [keycloak-aurora-serverless-from-existing-vpc](https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template) | Deploying AuroraServerless from an Existing VPC as a Keycloak for the database |
| [keycloak-aurora-serverless-from-new-vpc](https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-aurora-serverless-from-new-vpc.template)           | New VPC Deployment AuroraServerless for database Keycloak                      |
| [keycloak-from-existing-vpc](https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-existing-vpc.template)                                     | Deploying RDS MySQL from an existing VPC as the Keycloak for the database      |
| [keycloak-from-new-vpc](https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-new-vpc.template)                                               | New VPC Deploying RDS MySQL as Keycloak for Database                           |

| template link                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [keycloak-aurora-serverless-from-existing-vpc.template](https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template) |
| [keycloak-aurora-serverless-from-new-vpc.template](https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-new-vpc.template)           |
| [keycloak-from-existing-vpc.template](https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-from-existing-vpc.template)                                     |
| [keycloak-from-new-vpc.template](https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-from-new-vpc.template)                                               |

## Deployment Guide

[refer here](./doc/DEPLOYMENT_GUIDE.md)

## Deploying from CDK

```shell
$ cd source
$ npm i

$ npm run cdk deploy keycloak-aurora-serverless-from-existing-vpc -- --parameters CertificateArn=xxx --parameters VpcId=xxx ...
$ npm run cdk deploy keycloak-aurora-serverless-from-new-vpc -- --parameters CertificateArn=xxx
$ npm run cdk deploy keycloak-from-existing-vpc -- --parameters CertificateArn=xxx --parameters VpcId=xxx ...
$ npm run cdk deploy keycloak-from-new-vpc -- --parameters CertificateArn=xxx
```

> Note: [Please make sure the CDK is properly Bootstrap](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)

## Examples

1. [How to integrate Keycloak with Amazon API Gateway?](./examples/api-gw/README.md)
2. [How to integrate Keycloak with AD/LDAP?](./doc/AD_LDAP_USER_FEDERATION.md)

## Frequently Asked Questions

[Refer here](./doc/FAQ.md)

***

Copyright 2021 Amazon.com, Inc. or its affiliates.

Licensed under the Apache License Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://www.apache.org/licenses/

This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.

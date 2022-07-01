# Keycloak on AWS

[![Build](https://github.com/aws-samples/keycloak-on-aws/actions/workflows/build.yml/badge.svg)](https://github.com/aws-samples/keycloak-on-aws/actions/workflows/build.yml)

[English](./README.md)

这是一个将 [Keycloak](https://www.keycloak.org/) 高可用部署在 AWS 的解决方案。Keycloak 是针对 Web 应用程序和 RESTful Web 服务的单一登录（SSO）解决方案。 Keycloak 的目标是简化安全性，以便应用程序开发人员可以轻松保护已部署在组织中的应用程序和服务。开箱即用地提供了开发人员通常必须为自己编写的安全功能，可以轻松地针对组织的个性化需求进行定制。 Keycloak 提供可自定义的用户界面，用于登录，注册，管理和帐户管理。 您还可以将 Keycloak 用作集成平台，以将其挂接到现有的 LDAP 和 Active Directory 服务器中。 您还可以将身份验证委派给第三方身份提供商，例如 Facebook 和 Google+ 。

## 架构图

![architecture](./docs/images/architecture/01-keycloak-on-aws-architecture.png)

- 在两个 [可用区][Availability Zones] 部署的高可用架构；
- 根据 AWS 最佳实践在 [Amazon Virtual Private Cloud (Amazon VPC)][Amazon VPC] 中配置了公有和私有子网进行资源隔离；
- 处在私有子网中的资源通过公有子网中的NAT网关连接到互联网，但不能接收来自互联网的未经请求的入站连接；
- 在私有子网中:
	- 使用 [AWS Fargate][AWS Fargate] 运行和扩展 [Amazon ECS][Amazon ECS] 容器工作负载；
	- 使用 [Application Load Balancer][Application Load Balancer] 负载均衡请求流量；
	- 部署 [Amazon Aurora Serverless MySQL-Compatible][Amazon Aurora Serverless] 或 [Amazon Aurora MySQL-Compatible][Amazon Aurora] 数据库集群。
- 为 [Amazon ECS][Amazon ECS] 服务创建 [IAM][AWS Identity and Access Management] 角色；
- 通过 [AWS Secrets Manager][AWS Secrets Manager] 管理 [Keycloak][Keycloak] 控制台登录和数据库连接密钥；
- 通过 [AWS Certificate Manager (ACM)][Amazon Certificate Manager] 将现有的证书应用到 [Application Load Balancer][Application Load Balancer] 的域名上；
- 在 [Amazon Route 53][Amazon Route 53] 中添加别名记录，用于访问Keycloak控制台。

## 快速启动

[部署解决方案](./docs/zh/implementation-guide/deployment.md)

## License

Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://www.apache.org/licenses/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.

[Availability Zones]: https://aws.amazon.com/about-aws/global-infrastructure/regions_az/
[AWS CloudFormation]: https://amazonaws.cn/cloudformation/
[Amazon VPC]: https://amazonaws.cn/vpc/
[AWS Fargate]: https://amazonaws.cn/fargate/
[Amazon ECS]: https://amazonaws.cn/ecs/
[Amazon ECR]: https://amazonaws.cn/ecr/
[Application Load Balancer]: https://amazonaws.cn/elasticloadbalancing/application-load-balancer/
[Amazon Certificate Manager]: https://amazonaws.cn/certificate-manager/
[AWS Identity and Access Management]: https://amazonaws.cn/iam/
[Amazon Route 53]: https://amazonaws.cn/route53/
[Amazon Aurora]: https://amazonaws.cn/rds/aurora
[Amazon Aurora Serverless]: https://amazonaws.cn/rds/aurora/serverless/
[AWS Secrets Manager]: https://amazonaws.cn/secrets-manager/
[Keycloak]: https://www.keycloak.org/

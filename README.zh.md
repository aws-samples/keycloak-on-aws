# Keycloak on AWS

[![Build](https://github.com/aws-samples/keycloak-on-aws/actions/workflows/build.yml/badge.svg)](https://github.com/aws-samples/keycloak-on-aws/actions/workflows/build.yml)

[English](./README.md)

这是一个将 [Keycloak](https://www.keycloak.org/) 高可用部署在 AWS 的解决方案。Keycloak 是针对 Web 应用程序和 RESTful Web 服务的单一登录（SSO）解决方案。 Keycloak 的目标是简化安全性，以便应用程序开发人员可以轻松保护已部署在组织中的应用程序和服务。开箱即用地提供了开发人员通常必须为自己编写的安全功能，可以轻松地针对组织的个性化需求进行定制。 Keycloak 提供可自定义的用户界面，用于登录，注册，管理和帐户管理。 您还可以将 Keycloak 用作集成平台，以将其挂接到现有的 LDAP 和 Active Directory 服务器中。 您还可以将身份验证委派给第三方身份提供商，例如 Facebook 和 Google+ 。

## 架构图

![architecture](./docs/images/architecture/01-keycloak-on-aws-architecture.png)

1. NAT Gateway 作为私有子网的公网访问出口。
2. Application Load Balancer 将流量分发给 AWS ECS Fargate 应用层服务。另外，ALB 还启动了 Sticky Session 实现分布式 Session。详情可以参考 [Keycloak 文档](https://www.keycloak.org/docs/latest/server_installation/index.html#sticky-sessions)。
3. 数据库层您可以选择 Amazon Aurora Serverless 以降低成本或者 Amazon Aurora。
4. 数据库账户密码与 Keycloak 管理员登录账户密码都使用 AWS Secrets Management 自动生成来确保安全
5. 您需要提供一个 AWS Certificate Manager 证书的 Arn 来提供 ALB 的 HTTPS 访问

## 快速启动

[部署解决方案](./docs/zh/implementation-guide/deployment.md)

## License

Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://www.apache.org/licenses/

or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.

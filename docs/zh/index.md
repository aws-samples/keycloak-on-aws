这是一种将 Keycloak 部署到具有高可用性的 AWS 的解决方案。 Keycloak 是一个开源程序，可让您设置安全的单点登录程序。 它支持多种协议，例如 SAML 2.0、OAuth 2.0 和 OpenID Connect。 它还可以在本地或通过 LDAP 或 Active Directory 服务器存储用户凭据。

该解决方案主要包括以下特点：

- **Single-Sign On**: 支持 OpenID Connect、OAuth 2.0 和 SAML 2.0 标准协议。

- **Identity and Access Management**: 提供用户联合、强认证、用户管理、细粒度授权等。 轻松的添加身份验证到应用程序和服务中，而无需处理存储用户或验证用户。

本实施指南描述了在 AWS 云中部署 Keycloak 解决方案的架构注意事项和配置步骤。 它包括指向 [CloudFormation][cloudformation] 模板的链接，这些模板使用 AWS 安全性和可用性最佳实践来启动和配置部署此解决方案所需的 AWS 服务。

该指南面向具有 AWS 云架构实践经验的 IT 架构师、开发人员和 DevOps。

[cloudformation]: https://aws.amazon.com/en/cloudformation/
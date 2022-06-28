通过此解决方案您可以快速在 AWS 云上构建高可用架构的 Keycloak 集群，用以实现标准化的身份和访问控制系统。Keycloak 是一款开源的身份和访问控制软件，提供单点登录功能，以及可自定义的用户界面，用于登录、注册和帐户管理等。您可将其集成到现有的 LDAP 和 Azure Active Directory 服务器中，也可以将身份验证委派给第三方身份提供商。

该解决方案主要包括以下特点：

- **单点登录**: 支持 OpenID Connect、OAuth 2.0 和 SAML 2.0 标准协议。

- **身份和访问管理**: 提供用户联合、强认证、用户管理、细粒度授权等。轻松的添加身份验证到应用程序和服务中，而无需处理存储用户或验证用户。

## 术语

以下是相关术语的说明。

| 术语 | 全称 | 描述 |
| --- | --- | :--- |
| SSO | Single-Sign On | Single-Sign On 是一种身份验证方案，它允许用户使用单个 ID 登录到任何一个关但独立的软件系统中。 |
OAuth | Open Authorization | Open Authorization 是访问授权的开放标准，通常用作互联网用户授予网站或应用程序访问其在其它网站上的信息但不给密码的一种方式。 |
OpenID | OpenID | OpenID 是由非营利性 OpenID 基金会推动的开放标准和去中心化的身份验证协议。 有关详细信息，请参阅[OpenID Connect](https://en.wikipedia.org/wiki/OpenID#OpenID_Connect_(OIDC))。 |
ICP | Internet Content Provider | ICP 许可证是中国工业和信息化部（MIIT）颁发的允许中国网站在中国运营的许可证。 |
JWT | JSON Web Token | JSON Web Token 是一种提议的 Internet 标准，用于创建具有可选签名和/或可选加密的数据，其有效负载包含断言一定数量的声明的 JSON。令牌使用私有密钥或公钥/私钥进行签名。|
LDAP | Lightweight Directory Access Protocol | Lightweight Directory Access Protocol 是一种开放的、供应商中立的、行业标准的应用协议，用于通过 Internet 协议 (IP) 网络访问和维护分布式目录信息服务。 |
AD | Active Directory | Active Directory 是 Microsoft 为 Windows 域网络开发的目录服务。 它作为一组进程和服务包含在大多数 Windows Server 操作系统中。|

本实施指南描述了在 AWS 云中部署 Keycloak 解决方案的架构注意事项和配置步骤。它包括指向 [CloudFormation][cloudformation] 模板的链接，这些模板使用 AWS 安全性和可用性最佳实践来启动和配置部署此解决方案所需的 AWS 服务。

该指南面向具有 AWS 云架构实践经验的 IT 架构师、开发人员和 DevOps。

[cloudformation]: https://aws.amazon.com/en/cloudformation/
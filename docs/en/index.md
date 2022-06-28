This solution allows you to quickly deploy a Keycloak cluster on Amazon Web Services Cloud. Keycloak is an Open Source Identity and Access Management solution for modern Applications and Services. Providing a customizable user interface, Keycloak supports use cases such as Single Sign-On (SSO), user registration, and user federation. You can configure Keycloak to integrate with Active Directory and LDAP. You can also set up Keycloak to delegate authentication to third-party identity providers.

This solution mainly includes the following features:

- **Single-Sign On**: supports standard protocols such as OpenID Connect, OAuth 2.0, and SAML 2.0.

- **Identity and Access Management**: provides user federation, strong authentication, user management, fine-grained authorization, and so on. Authentication can be added to applications and services without having to deal with storing users or authenticating users.

## Terminology

The following table lists the terminologies related to this solution.

| Terminology | Full Name | Description |
| --- | --- | :--- |
| SSO | Single-Sign On | Single sign-on (SSO) is an authentication scheme that allows a user to log in with a single ID to any of several related, yet independent, software systems. |
SAML | Security Assertion Markup Language | Security Assertion Markup Language is an open standard for exchanging authentication and authorization data between parties, in particular, between an identity provider and a service provider. SAML is an XML-based markup language for security assertions (statements that service providers use to make access-control decisions). |
OAuth | Open Authorization | Open Authorization is an open standard for access delegation, commonly used as a way for internet users to grant websites or applications access to their information on other websites but without giving them the passwords. |
OpenID | OpenID | OpenID is an open standard and decentralized authentication protocol promoted by the non-profit OpenID Foundation. For more information, refer to [OpenID Connect](https://en.wikipedia.org/wiki/OpenID#OpenID_Connect_(OIDC)). |
ICP | Internet Content Provider | ICP license is a permit issued by the Chinese Ministry of Industry and Information Technology (MIIT) to permit China-based websites to operate in China. |
JWT | JSON Web Token | JSON Web Token is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key. |
LDAP | Lightweight Directory Access Protocol | The Lightweight Directory Access Protocol is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services over an Internet Protocol (IP) network. |
AD | Active Directory | Active Directory is a directory service developed by Microsoft for Windows domain networks. It is included in most Windows Server operating systems as a set of processes and services. |

This implementation guide describes architectural considerations and configuration steps for deploying the Keycloak solution in the AWS cloud. It includes links to [CloudFormation][cloudformation] templates that launches and configures the AWS services required to deploy this solution using AWS best practices for security and availability.

The guide is intended for IT architects, developers, DevOps with practical experience architecting in the AWS Cloud.

[cloudformation]: https://aws.amazon.com/en/cloudformation/
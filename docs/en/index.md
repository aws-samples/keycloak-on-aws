This is a solution for deploying Keycloak to AWS with high availability. Keycloak is an open source program that allows you to setup a secure Single-Sign On provider. It supports multiple protocols such as SAML 2.0, OAuth 2.0 and OpenID Connect. It can also store user credentials locally or via an LDAP or Active Directory servers.

This solution mainly includes the following features:

- **Single-Sign On**: supports OpenID Connect, OAuth 2.0, and SAML 2.0 standard protocols.

- **Identity and Access Management**: provides user federation, strong authentication, user management, fine-grained authorization, and more. Authentication can be effortlessly added to applications and services without having to deal with storing users or authenticating users.

This implementation guide describes architectural considerations and configuration steps for deploying the Keycloak solution in the AWS cloud. It includes links to [CloudFormation][cloudformation] templates that launches and configures the AWS services required to deploy this solution using AWS best practices for security and availability.

The guide is intended for IT architects, developers, DevOps with practical experience architecting in the AWS Cloud.

[cloudformation]: https://aws.amazon.com/en/cloudformation/
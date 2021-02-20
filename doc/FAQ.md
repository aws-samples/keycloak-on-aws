## Frequently Asked Questions

## What is this solution?

This solution provides a one-click deployment method that allows you to quickly create highly available KeyCloak clusters in your own AWS account.

## What are the scenarios for this solution?

[KeyCloak](https://www.keycloak.org/) is a set of open source software that provides features such as identity management and access management, including.

1. single sign-on/log-off (Single-Sign On/Out)
2. Identity Brokering and Social Application Login (Identity Brokering and Social Login)
3. user federation (User Federation)

## How does the solution work?

CloudFormation template or AWS CDK is used to automatically deploy and configure KeyCloak clusters. After deployment, the entire KeyCloak service will run in the Amaozn ECS environment supported by AWS Fargate, and the corresponding database clusters and ALB load balancers will be automatically configured to provide a complete set of highly available KeyCloak environment.


## What prerequisites do I need to be aware of before starting?

1. Make sure you have at least two public subnets, two private subnets, and one NAT gateway on the public subnet in the target area of the VPC.
2. Make sure you have a domain name that has been filed with ICP.


## What regions is this solution supported to run in?

You can deploy to major AWS regions worldwide, including the AWS (Ningxia) region operated by Xiyun Data and the AWS (Beijing) region operated by Huanhuan New Network.

## What database types are supported by this solution

Any of the following database types can be selected.

1. Amazon RDS Database Cluster includes two database instances to provide a highly available environment
2. Amazon Aurora Serverless Database Cluster provides a highly available environment, and this model does not generate any database instances
3. Amazon RDS Database instance, which only provides a single database instance and is not recommended for production environments

## How to specify the initial username and password

The initial administrator accounts and passwords for KeyCloak and Database services will be automatically generated and saved through AWS Secrets Manager for security and compliance purposes.

## What to do if you fail to deploy Auora Serverless

Some AWS regions, such as `us-west-2`, have some AZs that do not support Aurora Serverless support, resulting in deployment failure. Please refer to the AWS CloudFormation failure message and select the appropriate AZ for deployment, see [#5](https://github.com/) aws-samples/keycloak-on-aws/issues/5)


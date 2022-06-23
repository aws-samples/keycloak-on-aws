# Overview

Before you launch the solution, review the architecture, supported regions, and other considerations discussed in this guide. Follow the step-by-step instructions in this section to configure and deploy the solution into your account.

## Prerequisites

Make sure you have the following in the target region you want to deploy the solution:

- the domain name has been recorded by ICP and used to apply for ACM certificate.
- the certificate of the domain name is created in ACM and verified by the domain name.
- VPC with 4 subnets (including two public subnets and two private subnets) and NAT Gateway.
- all the AWS Services listed in [required AWS Services](../resources/aws-services.md) are available.

## Deploy the solution
You can choose to deploy the solution in AWS Standard Regions or AWS China Regions. For more information about supported regions, see [Regional deployments](../considerations.md).

* [Deployment in AWS Standard Regions](./global-region.md)
* [Deployment in AWS China Regions](./china-region.md)


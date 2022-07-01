Deploying this solution with the default parameters builds the following environment in the AWS Cloud.

![architecture](../images/architecture/01-keycloak-on-aws-architecture.png)

Figure 1: Solution architecture

This solution deploys the AWS CloudFormation template in your AWS Cloud account and completes the following settings.
 
- A highly available architecture that spans two [Availability Zones][Availability Zones].
- A [Amazon Virtual Private Cloud (Amazon VPC)][Amazon VPC] configured with public and private subnets, according to AWS best practices, to provide you with your own virtual network on AWS.
- In the public subnets, managed Network Address Translation (NAT) gateways to allow outbound internet access for resources in the private subnets.
- In the private subnets:
	- [Amazon Elastic Container Service (Amazon ECS)][Amazon ECS] tasks running with [AWS Fargate][AWS Fargate] behind the [Application Load Balancer][Application Load Balancer].
	- [Amazon Aurora Serverless MySQL-Compatible][Amazon Aurora Serverless] database cluster or [Amazon Aurora MySQL-Compatible][Amazon Aurora] cluster.
- [IAM][AWS Identity and Access Management] role for the [Amazon ECS][Amazon ECS] service.
- Secrets from [AWS Secrets Manager][AWS Secrets Manager] for [Keycloak][Keycloak] console login and database connection.
- [AWS Certificate Manager (ACM)][Amazon Certificate Manager], which uses your existing certificate for the custom domain name on the [Application Load Balancer][Application Load Balancer].
- [Amazon Route 53][Amazon Route 53] alias record, which is required for the custom domain name.

[Availability Zones]: https://aws.amazon.com/about-aws/global-infrastructure/regions_az/
[AWS CloudFormation]: https://aws.amazon.com/cloudformation/
[Amazon VPC]: https://aws.amazon.com/vpc/
[AWS Fargate]: https://aws.amazon.com/fargate/
[Amazon ECS]: https://aws.amazon.com/ecs/
[Amazon ECR]: https://aws.amazon.com/ecr/
[Application Load Balancer]: https://aws.amazon.com/elasticloadbalancing/application-load-balancer/
[Amazon Certificate Manager]: https://aws.amazon.com/certificate-manager/
[AWS Identity and Access Management]: https://aws.amazon.com/iam/
[Amazon Route 53]: https://aws.amazon.com/route53/
[Amazon Aurora]: https://aws.amazon.com/rds/aurora/
[Amazon Aurora Serverless]: https://aws.amazon.com/rds/aurora/serverless/
[AWS Secrets Manager]: https://aws.amazon.com/secrets-manager/
[Keycloak]: https://www.keycloak.org/

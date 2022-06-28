使用默认参数部署此解决方案会在 AWS 云中构建以下环境。

![architecture](../images/architecture/01-keycloak-on-aws-architecture.svg)

图1: 解决方案架构图

此解决方案在您的 AWS 云账户中部署 AWS CloudFormation 模板并完成以下设置。
 
- 在两个 [可用区][Availability Zones] 部署的高可用架构；
- 根据 AWS 最佳实践在 [Amazon Virtual Private Cloud (Amazon VPC)][Amazon VPC] 中配置了公有和私有子网进行资源隔离；
- 处在私有子网中的资源通过公有子网中的NAT网关连接到互联网，但不能接收来自互联网的未经请求的入站连接；
- 在私有子网中:
	- 使用 [AWS Fargate][AWS Fargate] 运行和扩展 [Amazon ECS][Amazon ECS] 容器工作负载；
	- 使用 [Application Load Balancer][Application Load Balancer] 负载均衡请求流量；
	- 部署 [Amazon Aurora Serverless][Amazon Aurora Serverless] 或 [Amazon Relational Database Service (Amazon RDS)][Amazon RDS] 数据库集群。
- 为 [Amazon ECS][Amazon ECS] 服务创建 [IAM][AWS Identity and Access Management] 角色；
- 通过 [AWS Secrets Manager][AWS Secrets Manager] 管理 [Keycloak][Keycloak] 控制台登录和数据库连接密钥；
- 通过 [AWS Certificate Manager (ACM)][Amazon Certificate Manager] 将现有的证书应用到 [Application Load Balancer][Application Load Balancer] 的域名上；
- 在 [Amazon Route 53][Amazon Route 53] 中添加别名记录，用于访问Keycloak控制台。

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
[Amazon RDS]: https://amazonaws.cn/rds/
[Amazon Aurora Serverless]: https://amazonaws.cn/rds/aurora/serverless/
[AWS Secrets Manager]: https://amazonaws.cn/secrets-manager/
[Keycloak]: https://www.keycloak.org/

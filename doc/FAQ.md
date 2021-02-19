# 常见问题

## 这个解决方案是什么？

此方案提供一键式的部署方式，使您可以在自己的AWS账号中快速创建高可用的KeyCloak集群。

## 这个解决方案的适用于什么场景？

[KeyCloak](https://www.keycloak.org/) 是一套开源软件，提供身份管理与访问管理等功能，包括了：

1. 单点登录/登出（Single-Sign On/Out）
2. 身份代理和社交应用登录（Identity Brokering and Social Login）
3. 用户联盟（User Federation）

## 这个解决方案的是如何运作的？

使用CloudFormation模版或AWS CDK来自动部署和配置KeyCloak集群，整套KeyCloak服务在部署完成之后会运行在AWS Fargate支撑的Amaozn ECS环境当中，并且自动配置相应的数据库集群与ALB负载均衡器，提供一整套高可用的KeyCloak环境。


## 我需要在启动前注意哪些前提条件？

1. 请确保您在目标区域的VPC内至少有两个公有子网，两个私有子网，一个位于公有子网的NAT网关。
2. 确保您拥有一个已经ICP备案的域名。


## 此解决方案支持在哪些区域运行？

您可以部署到AWS全球主要区域，包括由西云数据运营的AWS（宁夏）区域和由光环新网运营的 AWS（北京）区域。

## 此解决方案支持那些数据库类型

可选择下面任何一种数据库类型：

1. Amazon RDS Database Cluster包括两个数据库实例提供高可用环境
2. Amazon Aurora Serverless数据库集群提供高可用环境，此模式不会产生任何数据库实例
3. Amazon RDS Database instance，此模式仅提供单个数据库实例，不建议生产环境使用

## 如何指定初始用户名与密码

KeyCloak服务与数据库服务的初始管理员账户与密码会透过AWS Secrets Manager自动产生与保存以满足安全性与合规性，在部署完成之后可前往AWS Secrets Manager控制台获取相应的资讯。

## 部署Auora Serverless失败怎么办

部分AWS Region例如`us-west-2`存在某些AZ不支持Aurora Serverless的支持导致部署失败，请参考AWS CloudFormation失败讯息，选择相应的AZ进行部署即可，详见 [#5](https://github.com/aws-samples/keycloak-on-aws/issues/5)


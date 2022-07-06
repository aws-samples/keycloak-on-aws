您需要承担运行解决方案时使用亚马逊云科技各个服务的成本费用。 截至2022年7月，影响解决方案成本的主要因素包括：

- AWS Fargate
- Amazon Aurora MySQL-Compatible
- Application Load Balancer

## 示例 1

假设您的数据库是 Amazon Aurora MySQL-Compatible，使用多可用区集群部署、按需使用计价模式，在美国东部（弗吉尼亚北部）区域（us-east-1）使用此解决方案每月的成本如下所示：

| 服务 | 用量 | 成本/月 |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 个 ECS 任务每天运行 24 小时； </br> 2. 每个 ECS 任务使用 1 vCPU、2 GB 内存、20 GB 的临时存储；| $ 72.08 |
| Amazon Aurora MySQL-Compatible | 1. 实例类型为 db.t3.medium (2 vCPU, 4 GB 内存)； </br> 2. 在同一区域下的两个可用区中部署具有一个写入器数据库实例和一个读取器数据库实例的数据库集群； </br> 3. 按需使用计价模式； </br> 4. 配置 50 GB General Purpose SSD (gp2) 存储； </br> 5. 每秒 30 的基线 IO 速率、每秒 100 的峰值 IO 速率、每月高峰 IO 活动持续时间为60个小时；| $ 143.51 |
| Application Load Balancer | 1. 每月 100 GB 将 EC2 作为目标的流量； </br> 2. 平均每秒 40 个新连接； | $ 25.77 |
|总计 | |  $ 241.36 |


## 示例 2

假设您的数据库是 Amazon Aurora MySQL-Compatible，使用多可用区集群部署、一年预留实例的计价模式，在美国东部（弗吉尼亚北部）区域（us-east-1）使用此解决方案的成本如下所示：

| 服务 | 用量 | 成本/月 |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 个 ECS 任务每天运行 24 小时； </br> 2. 每个 ECS 任务使用 1 vCPU、2 GB 内存、20 GB 的临时存储；| $ 72.08 |
| Amazon Aurora MySQL-Compatible | 1. 实例类型为 db.t3.medium (2 vCPU, 4 GB 内存)； </br> 2. 在同一区域下的两个可用区中部署具有一个写入器数据库实例和一个读取器数据库实例的数据库集群； </br> 3. 一年预留实例的计价模式，购买选项为预付全部费用； </br> 4. 配置 50 GB General Purpose SSD (gp2) 存储； </br> 5. 每秒 30 的基线 IO 速率、每秒 100 的峰值 IO 速率、每月高峰 IO 活动持续时间为60个小时； | $ 103.12 |
| Application Load Balancer | 1. 每月 100 GB 将 EC2 作为目标的流量； </br> 2. 平均每秒 40 个新连接； | $ 25.77 |
|总计 | |  $ 200.97 |

## 示例 3

假设您的数据库是 Amazon Aurora Serverless MySQL-Compatible，在美国东部（弗吉尼亚北部）区域（us-east-1）使用此解决方案的成本如下所示：

| 服务 | 用量 | 成本/月 |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 个 ECS 任务每天运行 24 小时； </br> 2. 每个 ECS 任务使用 1 vCPU、2 GB 内存、20 GB 的临时存储；| $ 72.08 |
| Amazon Aurora Serverless MySQL-Compatible | 1. 每天使用 12 ACUs； </br> 2. 50 GB 的数据库存储； </br> 3. 每秒 30 的基线 IO 速率、每秒 100 的峰值 IO 速率、每月高峰 IO 活动持续时间为60个小时； | $ 67.59 |
| Application Load Balancer | 1. 每月 100 GB 将 EC2 作为目标的流量； </br> 2. 平均每秒 40 个新连接； | $ 25.77 |
|总计 | | $ 165.44|


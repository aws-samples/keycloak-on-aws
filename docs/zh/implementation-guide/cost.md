# 费用预估

您需要承担运行解决方案时使用亚马逊云科技各个服务的成本费用。 截至2022年6月，影响解决方案成本的主要因素包括：

- AWS Fargate成本
- Amazon RDS成本
- 互联网数据传输成本

!!! important "重要信息"

    以下成本是基于US East (N. Virginia)区域的价格进行评估。

## Example 1

让我们假设您的使用场景如下：

1. 您的服务需要使用 2 个 ECS 任务，每天 24 小时运行，每个 ECS 任务使用 4 vCPU、8 GB 内存、20 GB 的临时存储；

2. 您的数据库使用 RDS for MySQL，实例类型为 db.r5.large (2 vCPU, 16GB memory)、CPU 使用率为 75% / 月、使用多可用区部署、按需使用计价模式、配置 100 GB General Purpose SSD (gp2) 存储、额外的 100 GB 备份存储空间；

3. 每个月的互联网数据传输流量为500GB；

使用此解决方案的成本如下所示：

| 服务 | 维度 | 成本 |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 个 ECS 任务每天运行 24 小时； </br> 2. 每个 ECS 任务使用 4 vCPU、8 GB 内存、20 GB 的临时存储；| $ 288.30 (Monthly) |
| Amazon RDS for MySQL | 1. 实例类型为 db.r5.large (2 vCPU, 16 GB 内存)； </br> 2. CPU 使用率为 75% / 月； </br> 3. 使用多可用区部署； </br> 4. 按需使用计价模式； </br> 5. 配置 100 GB General Purpose SSD (gp2) 存储； </br> 6. 额外的 100 GB 备份存储空间； | $ 295.30 (Monthly) |
| 互联网数据传输 | 1. 互联网出站数据传输流量为每月 500 GB； | $ 45.00 (Monthly) |
| | | Total: $ 628.6 (Monthly)|


## Example 2

让我们假设您的使用场景如下：

1. 您的服务需要使用 2 个 ECS 任务，每天 24 小时运行，每个 ECS 任务使用 4 vCPU、8 GB 内存、20 GB 的临时存储；

2. 您的数据库使用 RDS for MySQL，实例类型为 db.r5.large (2 vCPU, 16GB memory)、CPU 使用率为 75% / 月、使用多可用区部署、一年预留实例的计价模式、配置 100 GB General Purpose SSD (gp2) 存储、额外的 100 GB 备份存储空间；

3. 每个月的互联网数据传输流量为500GB；

使用此解决方案的成本如下所示：

| 服务 | 维度 | 成本 |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 个 ECS 任务每天运行 24 小时； </br> 2. 每个 ECS 任务使用 4 vCPU、8 GB 内存、20 GB 的临时存储；| $ 288.30 (Monthly) |
| Amazon RDS for MySQL | 1. 实例类型为 db.r5.large (2 vCPU, 16 GB 内存)； </br> 2. CPU 使用率为 75% / 月； </br> 3. 使用多可用区部署； </br> 4. 一年预留实例的计价模式； </br> 5. 配置 100 GB General Purpose SSD (gp2) 存储； </br> 6. 额外的 100 GB 备份存储空间； | $ 96.36 (Monthly) |
| 互联网数据传输 | 1. 互联网出站数据传输流量为每月 500 GB； | $ 429.66 (Monthly) |
| | | Total: $ 628.6 (Monthly)|

## Example 3

让我们假设您的使用场景如下：

1. 您的服务需要使用 2 个 ECS 任务，每天 24 小时运行，每个 ECS 任务使用 4 vCPU、8 GB 内存、20 GB 的临时存储；

2. 您的数据库使用 Amazon Aurora Serverless，每小时使用 4 ACUs、100 GB 的数据库存储、每秒 30 的基线 IO 速率、每秒 100 的峰值 IO 速率、每月高峰 IO 活动持续时间为60个小时、额外的 100 GB 备份存储空间；

3. 每个月的互联网数据传输流量为500GB；

使用此解决方案的成本如下所示：

| 服务 | 维度 | 成本 |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 个 ECS 任务每天运行 24 小时； </br> 2. 每个 ECS 任务使用 4 vCPU、8 GB 内存、20 GB 的临时存储；| $ 288.30 (Monthly) |
| Amazon Aurora Serverless | 1. 每小时使用 4 ACUs； </br> 2. 100 GB 的数据库存储； </br> 3. 每秒 30 的基线 IO 速率； </br> 4. 每秒 100 的峰值 IO 速率； </br> 5. 每月高峰 IO 活动持续时间为60个小时； </br> 6. 额外的 100 GB 备份存储空间； | $ 206.09 (Monthly) |
| 互联网数据传输 | 1. 互联网出站数据传输流量为每月 500 GB； | $ 429.66 (Monthly) |
| | | Total: $ 539.39 (Monthly)|


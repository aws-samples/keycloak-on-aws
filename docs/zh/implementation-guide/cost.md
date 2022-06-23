# 费用预估

您需要承担运行解决方案时使用亚马逊云科技各个服务的成本费用。 截至2022年6月，影响解决方案成本的主要因素包括：

- AWS Fargate成本
- Amazon RDS成本
- 互联网数据传输成本

!!! important "重要信息"

    以下成本是基于US East (N. Virginia)区域的价格进行评估。


## AWS Fargate

AWS Fargate 定价基于从您开始下载容器映像到 Amazon ECS 任务或 Amazon EKS2 Pod 终止时使用的 vCPU、内存、操作系统、CPU 架构和存储资源计算，四舍五入到最接近的秒数。

**示例：1**

假设您的服务使用 2 个 ECS 任务，在一个月（30 天）内每天运行 24 小时（86400 秒），在此期间每个 ECS 任务使用 4 个 vCPU、8GB 内存和 20GB 临时存储。

**单位换算**

Tasks / Pods 的数量: 2 每天 * (730 小时每月 / 24 小时每天) = 60.83 每月

平均持续时间: 1 天 = 24 小时

**定价计算**

60.83 tasks x 4 vCPU x 24 小时 x 0.04048 USD 每小时 = 236.39 USD

60.83 tasks x 8.00 GB x 24 小时 x 0.004445 USD 每 GB 每小时= 51.91 USD

20 GB - 20 GB (无需额外费用) = 0.00 GB 每个任务的可计费临时存储

236.39 USD + 51.91 USD = 288.30 USD

**AWS Fargate 成本 (月):** 288.30 USD

## AWS RDS for MySQL

**示例：1**

假设您的数据库实例使用 db.r2.large（2 个 vCPU，16GB 内存），CPU 利用率为 75%/月，部署选项为多可用区，定价模型为按需，100GB 通用 SSD (gp2) 存储和 10GB 额外的备份存储。


**定价计算**

1 instance(s) x 0.48 USD 每小时 x (50 / 100 利用率/月) x 730 小时每月 = 175.2000 USD (db.r5.large)

100 GB x 0.23 USD x 1 instances = 23.00 USD (EBS 存储成本)

10 GB x 0.095 USD = 0.95 USD (额外的备份存储)

175.2000 USD (db.r5.large) + 23.00 USD (EBS Storage Cost) + 0.95 USD (Additional backup storage) = 374.35 USD

**RDS for MySQL 成本 (月):** 374.35 USD

**示例：2**

假设您的数据库实例使用 db.r2.large（2 个 vCPU，16GB 内存），CPU 利用率为 75%/月，部署选项为多可用区，定价模型为预留（1 年），100GB 通用 SSD (gp2) 存储和 10GB 额外的备份存储。

**定价计算**

1 instance(s) x 0.132 USD 每小时 x 730 小时每月 = 96.3600 USD (db.r5.large)

100 GB x 0.23 USD x 1 instances = 23.00 USD (EBS 存储成本)

10 GB x 0.095 USD = 0.95 USD (额外的备份存储)

96.3600 USD (db.r5.large) + 23.00 USD (EBS 存储成本) + 0.95 USD (额外的备份存储) = 120.31 USD

**RDS for MySQL 成本 (月):** 120.31 USD

## Amazon Aurora Serverless

假设 Amazon Aurora Serverless 每小时使用 4 个 ACUs、100GB 存储、每秒 30 个基线 IO 速率、每秒 100 个峰值 IO 速率、每月 60 个峰值 IO 活动小时的持续时间以及 10GB 额外备份存储。

**单位换算**

730 小时每月 - 60 每月高峰时段 = 670.00 每月基准小时数

基线 IO 速率: 30 每秒 * (60 分钟 x 60 秒) = 108000 每小时

峰值 IO 速率: 100 每秒 * (60 分钟 x 60 秒) = 360000 每小时

108,000 基线 IO x 670.00 每月基准小时数 = 72,360,000 (每月基线 IO)

360,000 峰值 IO x 60 每月高峰时段 = 21,600,000 (每月峰值 IO)

**定价计算**

4 ACU 每小时 x 730 小时每月 x 0.06 USD = 175.20 USD (Amazon Aurora Serverless)

100 GB x 0.10 USD = 10.00 USD (数据库存储成本)

72,360,000 (每月基线 IO) x 0.0000002 USD = 14.472 USD (基准 IO 成本)

21,600,000 (每月峰值 IO) x 0.0000002 USD = 4.32 USD (峰值 IO 成本)

10 GB x 0.021 USD = 0.21 USD (额外的备份存储)

175.20 USD (Amazon Aurora Serverless)  + 10.00 USD (数据库存储成本) + 14.472 USD (基准 IO 成本)+ 4.32 USD (峰值 IO 成本) + 0.21 USD (额外的备份存储) = 204.202 USD

**Amazon Aurora Serverless 成本 (月):** 204.202 USD

## 互联网数据传输

假设互联网出站数据传输流量为每月 500GB。

**定价计算**

互联网: 500 GB x 0.09 USD 每GB = 45.00 USD

**互联网数据传输成本 (月):** 45.00 USD


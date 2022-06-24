# Cost Estimation

You will be responsible for the cost of using each of the AWS services when running the solution. As of June 2022, the main factors affecting the solution cost include:

- Cost of AWS Fargate
- Cost of Amazon RDS
- Cost of Internet Data Transfer

!!! important "Important"

    The cost estimation are calculated based on the AWS service price of US East (N. Virginia) region.


## Example 1

Let's assume your usage scenario is as follows:

1. Your service uses 2 ECS Tasks that run for 24 hours (86400 seconds) every day for a month (30 days) during which each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage.

2. Your db instance use RDS for MySQL, and use db.r5.large (2 vCPU, 16GB memory), CPU Utilization is 75%/Month, Deployment option is Multi-AZ, Pricing model is OnDemand, 100GB General Purpose SSD (gp2) storage, and 100GB Additional backup storage.

3. Internet outbound data transfer traffic is 500GB per month.

The cost of using this solution is shown below:

| Service | Dimensions | Cost |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage. | $ 288.30 (Monthly) |
| Amazon RDS for MySQL | 1. Use db.r5.large (2 vCPU, 16GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ . </br> 4. Pricing model is OnDemand. </br> 5. 100GB General Purpose SSD (gp2) storage . </br> 6. 100GB Additional backup storage | $ 295.30 (Monthly) |
| Internet Data Transfer | 1. Internet outbound data transfer traffic is 500GB per month. | $ 45.00 (Monthly) |
| | | Total: $ 628.6 (Monthly)|


## Example 2

Let's assume your usage scenario is as follows:

1. Your service uses 2 ECS Tasks that run for 24 hours (86400 seconds) every day for a month (30 days) during which each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage.

2. Your db instance use RDS for MySQL, and use db.r5.large (2 vCPU, 16GB memory), CPU Utilization is 75%/Month, Deployment option is Multi-AZ, Pricing model is Reserved (1 year), 100GB General Purpose SSD (gp2) storage, and 100GB Additional backup storage.

3. Internet outbound data transfer traffic is 500GB per month.

The cost of using this solution is shown below:

| Service | Dimensions | Cost |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage. | $ 288.30 (Monthly) |
| Amazon RDS for MySQL | 1. Use db.r5.large (2 vCPU, 16GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ . </br> 4. Pricing model is Reserved (1 year). </br> 5. 100GB General Purpose SSD (gp2) storage . </br> 6. 100GB Additional backup storage | $ 96.36 (Monthly) |
| Internet Data Transfer | 1. Internet outbound data transfer traffic is 500GB per month. | $ 45.00 (Monthly) |
| | | Total: $ 429.66 (Monthly) |


## Example 3

Let's assume your usage scenario is as follows:

1. Your service uses 2 ECS Tasks that run for 24 hours (86400 seconds) every day for a month (30 days) during which each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage.

2. Your db instance use Amazon Aurora Serverless, and uses 4 ACUs per hour, 100GB database storage, 30 Baseline IO rate per second, 100 Peak IO rate per second, 60 Duration of peak IO activity hours per month, and 10GB additional backup storage.

3. Internet outbound data transfer traffic is 500GB per month.

The cost of using this solution is shown below:

| Service | Dimensions | Cost |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage. | $ 288.30 (Monthly) |
| Amazon Aurora Serverless | 1. 4 ACUs per hour. </br> 2. 100GB database storage. </br> 3. 30 Baseline IO rate per second. </br> 4. 100 Peak IO rate per second. </br> 5. 60 Duration of peak IO activity hours per month. </br> 6. 100GB additional backup storage. | $ 206.09 (Monthly) |
| Internet Data Transfer | 1. Internet outbound data transfer traffic is 500GB per month. | $ 45.00 (Monthly) |
| | | Total: $ 539.39 (Monthly)|


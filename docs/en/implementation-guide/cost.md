# Cost Estimation

You will be responsible for the cost of using each of the AWS services when running the solution. As of June 2022, the main factors affecting the solution cost include:

- AWS Fargate
- Amazon RDS
- Internet Data Transfer
## Example 1

Your database instance uses RDS for MySQL, with Multi-AZ deployment option, OnDemand pricing model. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral storage. | $ 288.30 |
| Amazon RDS for MySQL | 1. Use db.r5.large (2 vCPU, 16GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ. </br> 4. Pricing model is OnDemand. </br> 5. 100GB General Purpose SSD (gp2) storage . </br> 6. 100GB Additional backup storage | $ 295.30 |
| Internet Data Transfer | 1. Internet outbound data transfer traffic is 500GB per month. | $ 45.00 |
| | | Total: $ 628.6|


## Example 2

Your database instance uses RDS for MySQL, with Multi-AZ deployment option, reserved (1 year) pricing model. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral storage. | $ 288.30 |
| Amazon RDS for MySQL | 1. Use db.r5.large (2 vCPU, 16GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ. </br> 4. Pricing model is Reserved (1 year). </br> 5. 100GB General Purpose SSD (gp2) storage . </br> 6. 100GB Additional backup storage | $ 96.36 |
| Internet Data Transfer | 1. Internet outbound data transfer traffic is 500GB per month. | $ 45.00 |
| | | Total: $ 429.66 |


## Example 3

Your database instance use Amazon Aurora Serverless. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral storage. | $ 288.30|
| Amazon Aurora Serverless | 1. 4 ACUs per hour. </br> 2. 100GB database storage. </br> 3. 30 Baseline IO rate per second. </br> 4. 100 Peak IO rate per second. </br> 5. 60 Duration of peak IO activity hours per month. </br> 6. 100GB additional backup storage. | $ 206.09 |
| Internet Data Transfer | 1. Internet outbound data transfer traffic is 500GB per month. | $ 45.00|
| | | Total: $ 539.39|


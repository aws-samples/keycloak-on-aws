# Cost Estimation

You will be responsible for the cost of using each of the AWS services when running the solution. As of June 2022, the main factors affecting the solution cost include:

- AWS Fargate
- Amazon RDS
- Application Load Balancer
## Example 1

Your database instance uses RDS for MySQL, with Multi-AZ deployment option, OnDemand pricing model. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost (MLY) |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 1 vCPU, 2GB memory, and 20GB ephemeral storage. | $ 72.08 |
| Amazon RDS for MySQL | 1. Use db.t3.medium (2 vCPU, 4 GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ. </br> 4. Pricing model is OnDemand. </br> 5. 50GB General Purpose SSD (gp2) storage . </br> 6. 30 Baseline IO rate per second. </br> 7. 100 Peak IO rate per second. </br> 8. 60 Duration of peak IO activity hours per month. | $ 83.65 |
| Application Load Balancer | 1. 100 GB per month for EC2 Instances and IP addresses as targets. </br> 2. Average 40 new connections per second. | $ 25.77 |
| Total | | $ 181.5 |


## Example 2

Your database instance uses RDS for MySQL, with Multi-AZ deployment option, reserved (1 year) pricing model. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost (MLY) |
| ------- | :--- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 1 vCPU, 2GB memory, and 20GB ephemeral storage. | $ 72.08 |
| Amazon RDS for MySQL | 1. Use db.t3.medium (2 vCPU, 4 GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ. </br> 4. Pricing model is Reserved (1 year), purchase Option is All Upfront. </br> 5. 50GB General Purpose SSD (gp2) storage . </br> 6. 30 Baseline IO rate per second. </br> 7. 100 Peak IO rate per second. </br> 8. 60 Duration of peak IO activity hours per month. | $ 23.79 |
| Application Load Balancer | 1. 100 GB per month for EC2 Instances and IP addresses as targets. </br> 2. Average 40 new connections per second. | $ 25.77 |
| Total | | $ 121.64 |


## Example 3

Your database instance use Amazon Aurora Serverless. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost (MLY) |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 1 vCPU, 2GB memory, and 20GB ephemeral storage. | $ 72.08 |
| Amazon Aurora Serverless | 1. 12 ACUs per day. </br> 2. 50GB database storage. </br> 3. 30 Baseline IO rate per second. </br> 4. 100 Peak IO rate per second. </br> 5. 60 Duration of peak IO activity hours per month. | $ 67.59 |
| Application Load Balancer | 1. 100 GB per month for EC2 Instances and IP addresses as targets. </br> 2. Average 40 new connections per second. | $ 25.77 |
| Total | | $ 165.44 |


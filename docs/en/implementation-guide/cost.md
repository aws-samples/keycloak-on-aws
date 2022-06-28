# Cost Estimation

You will be responsible for the cost of using each of the AWS services when running the solution. As of June 2022, the main factors affecting the solution cost include:

- AWS Fargate
- Amazon RDS
- Application Load Balancer
## Example 1

Your database instance uses RDS for MySQL, with Multi-AZ deployment option, OnDemand pricing model. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost (Monthly) |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 30GB memory, and 20GB ephemeral storage. | $ 431.07 |
| Amazon RDS for MySQL | 1. Use db.r5.large (2 vCPU, 16GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ. </br> 4. Pricing model is OnDemand. </br> 5. 50GB General Purpose SSD (gp2) storage . | $ 274.30 |
| Application Load Balancer | 1. 100 GB per month for EC2 Instances and IP addresses as targets. </br> 2. Average 40 new connections per second. | $ 25.77 |
| | | Total: $ 731.14|


## Example 2

Your database instance uses RDS for MySQL, with Multi-AZ deployment option, reserved (1 year) pricing model. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost (Monthly) |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 30GB memory, and 20GB ephemeral storage. | $ 431.07 |
| Amazon RDS for MySQL | 1. Use db.r5.large (2 vCPU, 16GB memory). </br> 2. CPU Utilization is 75%/Month. </br> 3. Deployment option is Multi-AZ. </br> 4. Pricing model is Reserved (1 year). </br> 5. 50GB General Purpose SSD (gp2) storage . | $ 213.86 |
| Application Load Balancer | 1. 100 GB per month for EC2 Instances and IP addresses as targets. </br> 2. Average 40 new connections per second. | $ 25.77 |
| | | Total: $ 670.7 |


## Example 3

Your database instance use Amazon Aurora Serverless. The monthly cost of using this solution in the US East (N. Virginia) region is shown below:

| Service | Dimensions | Cost (Monthly) |
| ------- | --- | ---: |
| AWS Fargate | 1. 2 ECS Tasks that run for 24 hours every day. </br> 2. Each ECS task uses 4 vCPU, 30GB memory, and 20GB ephemeral storage. | $ 431.07 |
| Amazon Aurora Serverless | 1. 2 ACUs per hour. </br> 2. 50GB database storage. </br> 3. 30 Baseline IO rate per second. </br> 4. 100 Peak IO rate per second. </br> 5. 60 Duration of peak IO activity hours per month. | $ 198.99 |
| Application Load Balancer | 1. 100 GB per month for EC2 Instances and IP addresses as targets. </br> 2. Average 40 new connections per second. | $ 25.77 |
| | | Total: $ 655.83|


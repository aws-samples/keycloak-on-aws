# Cost Estimation

You will be responsible for the cost of using each of the AWS services when running the solution. As of June 2022, the main factors affecting the solution cost include:

- Cost of AWS Fargate
- Cost of Amazon RDS
- Cost of Internet Data Transfer

!!! important "Important"

    The cost estimation are calculated based on the AWS service price of US East (N. Virginia) region.


## AWS Fargate

AWS Fargate pricing is calculated based on the vCPU, memory, Operating Systems, CPU Architecture, and storage resources used from the time you start to download your container image until the Amazon ECS Task or Amazon EKS2 Pod terminates, rounded up to the nearest second.

**Example 1**

Let's assume your service uses 2 ECS Tasks that run for 24 hours (86400 seconds) every day for a month (30 days) during which each ECS task uses 4 vCPU, 8GB memory, and 20GB ephemeral stroage. 

**Unit conversions management events**

Number of tasks or pods: 2 per day * (730 hours in a month / 24 hours in a day) = 60.83 per month

Average duration: 1 days = 24 hours

**Pricing calculations**

60.83 tasks x 4 vCPU x 24 hours x 0.04048 USD per hour = 236.39 USD for vCPU hours

60.83 tasks x 8.00 GB x 24 hours x 0.004445 USD per GB per hour = 51.91 USD for GB hours

20 GB - 20 GB (no additional charge) = 0.00 GB billable ephemeral storage per task

236.39 USD for vCPU hours + 51.91 USD for GB hours = 288.30 USD total

**AWS Fargate cost (monthly):** 288.30 USD

## AWS RDS for MySQL

**Example 1**

Let's assume your db instance uses db.r2.large (2 vCPU, 16GB memory), CPU Utilization is 75%/Month, Deployment option is Multi-AZ, Pricing model is OnDemand, 100GB General Purpose SSD (gp2) storage, and 10GB Additional backup storage.

**Pricing calculations**

1 instance(s) x 0.48 USD hourly x (50 / 100 Utilized/Month) x 730 hours in a month = 175.2000 USD for db.r5.large

100 GB x 0.23 USD x 1 instances = 23.00 USD for EBS Storage Cost

10 GB x 0.095 USD = 0.95 USD for Additional backup storage

175.2000 USD for db.r5.large + 23.00 USD for EBS Storage Cost + 0.95 USD for Additional backup storage = 374.35 USD total

**RDS for MySQL cost (monthly):** 374.35 USD

**Example 2**

Let's assume your db instance uses db.r2.large (2 vCPU, 16GB memory), CPU Utilization is 75%/Month, Deployment option is Multi-AZ, Pricing model is Reserved (1 year), 100GB General Purpose SSD (gp2) storage, and 10GB additional backup storage.

**Pricing calculations**

1 instance(s) x 0.132 USD hourly x 730 hours in a month = 96.3600 USD for db.r5.large

100 GB x 0.23 USD x 1 instances = 23.00 USD for EBS Storage Cost

10 GB x 0.095 USD = 0.95 USD for Additional backup storage

96.3600 USD for db.r5.large + 23.00 USD for EBS Storage Cost + 0.95 USD for Additional backup storage = 120.31 USD total

**RDS for MySQL cost (monthly):** 120.31 USD

## Amazon Aurora Serverless

Let's assume Amazon Aurora Serverless uses 4 ACUs per hour, 100GB storage, 30 Baseline IO rate per second, 100 Peak IO rate per second, 60 Duration of peak IO activity hours per month, and 10GB additional backup storage.

**Unit conversions**

730 hours in a month - 60 peak hours per month = 670.00 baseline hours per month

Baseline IO rate: 30 per second * (60 minutes in an hour x 60 seconds in a minute) = 108000 per hour

Peak IO rate: 100 per second * (60 minutes in an hour x 60 seconds in a minute) = 360000 per hour

108,000 baseline IOs x 670.00 baseline hours per month = 72,360,000 (Monthly Baseline IOs)

360,000 peak IOs x 60 peak hours per month = 21,600,000 (Monthly Peak IOs)

**Pricing calculations**

4 ACU per hour x 730 hours in a month x 0.06 USD = 175.20 USD (Amazon Aurora Serverless)

100 GB x 0.10 USD = 10.00 USD (Database Storage Cost)

72,360,000 (Monthly Baseline IOs) x 0.0000002 USD = 14.472 USD (Baseline IOs Cost)

21,600,000 (Monthly Peak IOs) x 0.0000002 USD = 4.32 USD (Peak IOs Cost)

10 GB x 0.021 USD = 0.21 USD (Additional backup storage)

175.20 USD (Amazon Aurora Serverless)  + 10.00 USD (Database Storage Cost) + 14.472 USD (Baseline IOs Cost) + 4.32 USD (Peak IOs Cost) + 0.21 USD (Additional backup storage) = 204.202 USD

**Amazon Aurora Serverless cost (monthly):** 204.202 USD

## Data Transfer

Let's assume the internet outbound data transfer traffic is 500GB per month.

**Pricing calculations**

Internet: 500 GB x 0.09 USD per GB = 45.00 USD

**Data Transfer cost (monthly):** 45.00 USD


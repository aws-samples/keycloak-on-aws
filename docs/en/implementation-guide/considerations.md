
## Regional deployments
This solution uses services which may not be currently available in all AWS Regions. Launch this solution in an AWS Region where required services are available. For the most current availability by Region, refer to the [AWS Regional Services List][services]. 

Because the solution has Amazon Aurora MySQL-Compatible, Amazon Aurora Serverless v1 MySQL-Compatible and Amazon Aurora Serverless v2 MySQL-Compatible to choose from, when deploying with CloudFormation, you need to check whether the region supports your choice.

For Aurora Serverless deployments, Aurora Serverless v2 MySQL-Compatible is provided by default in the CloudFormation templates. Aurora Serverless v2 scales more quickly and in a more granular way and also has more compatibility with other Aurora features such as reader DB instances. For more information, see [Comparison of Aurora Serverless v2 and Aurora Serverless v1 requirements][comparisons].

**Supported regions for database deployment in AWS Global Regions**

| Region ID      | Region Name              | Amazon Aurora MySQL-Compatible  | Amazon Aurora Serverless v1 MySQL-Compatible |Amazon Aurora Serverless v2 MySQL-Compatible |
| -------------- | ------------------------ | :------------: | :----------------------: | :----------------------: |
| us-east-1      | US East (N. Virginia)    |   &#10004;     |       &#10004;           |  &#10004;           |
| us-east-2      | US East (Ohio)           |   &#10004;     |       &#10004;           |  &#10004;           |
| us-west-1      | US West (N. California)  |   &#10004;     |       &#10004;           |  &#10004;           |
| us-west-2      | US West (Oregon)         |   &#10004;     |       &#10004;           |  &#10004;           |
| af-south-1     | Africa (Cape Town)       |   &#10004;     |                          |  &#10004;           |
| ap-east-1      | Asia Pacific (Hongkong)  |   &#10004;     |                          |  &#10004;           |
| ap-south-2     | Asia Pacific (Hyderabad) |   &#10004;     |                          |  &#10004;           |
| ap-southeast-3 | Asia Pacific (Jakarta)   |   &#10004;     |                          |  &#10004;           |
| ap-southeast-4 | Asia Pacific (Melbourne) |   &#10004;     |                          |  &#10004;           |
| ap-south-1     | Asia Pacific (Mumbai)    |   &#10004;     |       &#10004;           |  &#10004;           |
| ap-northeast-3 | Asia Pacific (Osaka)     |   &#10004;     |                          |  &#10004;           |
| ap-northeast-2 | Asia Pacific (Seoul)     |   &#10004;     |       &#10004;           |  &#10004;           |
| ap-southeast-1 | Asia Pacific (Singapore) |   &#10004;     |       &#10004;           |  &#10004;           |
| ap-southeast-2 | Asia Pacific (Sydney)    |   &#10004;     |       &#10004;           |  &#10004;           |
| ap-northeast-1 | Asia Pacific (Tokyo)     |   &#10004;     |       &#10004;           |  &#10004;           |
| ca-central-1   | Canada (Central)         |   &#10004;     |       &#10004;           |  &#10004;           |
| eu-central-1   | Europe (Frankfurt)       |   &#10004;     |       &#10004;           |  &#10004;           |
| eu-west-1      | Europe (Ireland)         |   &#10004;     |       &#10004;           |  &#10004;           |
| eu-west-2      | Europe (London)          |   &#10004;     |       &#10004;           |  &#10004;           |
| eu-south-1     | Europe (Milan)           |   &#10004;     |                          |  &#10004;           |
| eu-west-3      | Europe (Paris)           |   &#10004;     |       &#10004;           |  &#10004;           |
| eu-south-2     | Europe (Spain)           |   &#10004;     |                          |  &#10004;           |
| eu-north-1     | Europe (Stockholm)       |   &#10004;     |                          |  &#10004;           |
| eu-central-2   | Europe (Zurich)          |   &#10004;     |                          |  &#10004;           |
| il-central-1   | Israel (Tel Aviv)        |   &#10004;     |                          |  &#10004;           |
| me-south-1     | Middle East (Bahrain)	|   &#10004;     |                          |  &#10004;           |
| me-central-1   | Middle East (UAE)	    |   &#10004;     |                          |  &#10004;           |
| sa-east-1      | South America (Sao Paulo)|   &#10004;     |                          |  &#10004;           |


**Supported regions for database deployment in AWS China Regions**

| Region ID      | Region Name                               | Amazon Aurora MySQL-Compatible | Amazon Aurora Serverless v1 MySQL-Compatible |Amazon Aurora Serverless v2 MySQL-Compatible |
| -------------- | ----------------------------------------- | :------------: | :----------------------: | :----------------------: |
| cn-north-1     | China (Beijing) Region Operated by Sinnet |   &#10004;     |                          |       &#10004;           |
| cn-northwest-1 | China (Ningxia) Region Operated by NWCD   |   &#10004;     |       &#10004;           |       &#10004;           |


[services]: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/?nc1=h_ls
[comparisons]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.upgrade.html#Serverless.v1-v2-requirements
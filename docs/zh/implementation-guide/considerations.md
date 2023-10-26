
目前本解决方案使用的服务可能并非在所有亚马逊云科技区域都可用。您需要在提供所需服务的亚马逊云科技区域启动此解决方案。有关最新的区域可用性信息，请参阅 [AWS 区域服务列表][services]。

因为方案数据库有Amazon Aurora MySQL-Compatible，Amazon Aurora Serverless v1 MySQL-Compatible和Amazon Aurora Serverless v2 MySQL-Compatible三种选择，所以使用CloudFormation部署时，需要注意区域是否支持您的选择。

对于 Aurora Serverless 部署，CloudFormation 模板中默认使用 Aurora Serverless v2 MySQL-Compatible。 Aurora Serverless v2 可以更快、更精细地扩展，并且与其他 Aurora 功能（例如 Reader 数据库实例）具有更好的兼容性。 有关更多信息，请参阅[Aurora Serverless v2 和 Aurora Serverless v1 的比较][comparisons]。

**支持部署的全球区域**

| 区域ID         | 区域名称       | Amazon Aurora MySQL-Compatible  | Amazon Aurora Serverless v1 MySQL-Compatible |Amazon Aurora Serverless v2 MySQL-Compatible |
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

**支持部署的中国区域**

| 区域ID         | 区域名称                        | Amazon Aurora MySQL-Compatible | Amazon Aurora Serverless v1 MySQL-Compatible |Amazon Aurora Serverless v2 MySQL-Compatible |
| -------------- | ----------------------------------------- | :------------: | :----------------------: | :----------------------: |
| cn-north-1     | China (Beijing) Region Operated by Sinnet |   &#10004;     |                          |       &#10004;           |
| cn-northwest-1 | China (Ningxia) Region Operated by NWCD   |   &#10004;     |       &#10004;           |       &#10004;           |


[services]: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/?nc1=h_ls
[comparisons]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.upgrade.html#Serverless.v1-v2-requirements
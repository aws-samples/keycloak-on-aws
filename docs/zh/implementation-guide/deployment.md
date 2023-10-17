在部署解决方案之前，建议您先查看本指南中有关架构图和区域支持等信息，然后按照下面的说明配置解决方案并将其部署到您的帐户中。

**部署时间**：大约 30 分钟


## 前提条件

确保您要部署解决方案的目标区域满足以下条件：

- 若部署在中国区，需要已有被 ICP 备案的域名并用于申请 ACM 证书。
- 域名的证书在 ACM 中创建，并通过域名进行验证。
- 具有 4 个子网（包括两个公有子网和两个私有子网）和 NAT 网关的 VPC。
- 在 [AWS 服务](./additional-resources.md) 中所列出的所有AWS服务均可用。


## 部署概述

使用以下步骤在 AWS 上部署此解决方案：

<a href="#step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a>

<a href="#step-2-create-authentication-domain">步骤 2. 验证域所有权</a>

<a href="#step-3-launch-the-stack">步骤 3. 启动堆栈</a>

<a href="#step-4-create-a-record-in-route-53-for-resolving-the-domain-name">步骤 4. 在 Route 53 中创建记录以解析域名</a>

<a href="#step-5-browser-the-keycloak-web-console">步骤 5. 访问 Keycloak Web 控制台</a>

## <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a>

为了确保 Keycloak 可以连接到 Cognito 身份池，需要确保 Keycloak 提供 HTTPS 服务。这意味着必须使用 ACM 证书或第三方证书。有关如何使用的详细信息，请参阅[如何上载 SSL 证书并将其导入 AWS Identity and Access Management (IAM)](https://aws.amazon.com/cn/premiumsupport/knowledge-center/import-ssl-certificate-to-iam/)。

本指南以 AWS Certificate Manager (ACM) 的使用为例。有关 ACM 的更多信息，请参阅 [Amazon Certificate Manager][Amazon Certificate Manager]。

1. 登录 [AWS Certificate Manager][AWS Certificate Manager console] 控制台。

2. 在顶部的导航栏中，选择 Keycloak 想要部署的**区域**。

3. 在左侧的导航窗中，选择**列出证书**。

4. 选择**请求**。

5. 如果您选择从全球区域部署解决方案，为**证书类型**选择**请求公有证书**。如果您选择从中国区域部署解决方案，仅有一个选项**请求公有证书**，选择该选项。然后选择**下一步**。

6. 选择**下一步**。

7. 在**请求公有证书**页面，完成以下配置：
    1. 在**域名**中输入您的 Keycloak 的域名，例如 *keycloak.yourdomain.com*。
    2. 修改 **选择验证方法** 为 **DNS 验证 - 推荐**。

8. 选择**请求**。

9. 查看**证书**列表，新申请的证书 ID 的**状态**处于**等待验证**。

10. 点击新申请的**证书 ID** 查看详细信息。在新打开的页面中记录以下内容：
    1. **状态**中的 **ARN**。
    2. **域**中的 **CNAME 名称**。
    3. **域**中的 **CNAME 值**。

## <a id="step-2-create-authentication-domain">步骤 2. 验证域所有权</a>

> **_NOTE:_** 以下内容为通过 Route 53 验证域名所有权。如果您使用其他域名服务器 (DNS)，请参考 DNS 提供商文档来验证您的域名所有权。

将 CNAME 记录添加到 Route 53 以验证域名是否归您所有并可供您使用。如果未创建托管区域，请参考[将 Amazon Route 53 配置为 DNS 服务][Configuring Amazon Route 53 as your DNS service]。

1. 登录 [Amazon Route 53][Amazon Route 53 console] 控制台。

2. 在左侧的导航窗中，选择**托管区域**。

3. 点击**域名**查看详细信息，在新打开的页面中点击**创建记录** ，并完成以下操作：
    1. 在**记录名称**中输入<a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **CNAME name**，例如 *_5db1a2688389b3b76ef6e2accaf9a85d.keycloak.yourdomain.com*。
    2. 修改**记录类型**为 **CNAME**。
    3. 在 **值** 中输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **CNAME value** ，例如 *_1e9108227615sd40f3a767a9dc7a29cb.bpxxncpwjz.acm-validations.aws*。

4. 选择**创建记录**。

5. 返回到 [AWS Certificate Manager][AWS Certificate Manager console] 控制台并等待大约5分钟，点击**刷新** 按钮，直到 ACM 证书的**状态**变为**已颁发**。

## <a id="step-3-launch-the-stack">步骤 3. 启动堆栈</a>

为满足不同用户的需求，共有 4 种部署方式供您选择。

对于 Aurora Serverless 选项，CloudFormation 模板中默认使用 Aurora Serverless v2 MySQL-Compatible。有关更多信息，请参阅[Aurora Serverless v2 和 Aurora Serverless v1 的比较][comparisons]。

| 选项 | VPC | 数据库 | 快速启动 | 模板链接 |
| :--- | --- | ----- | :--------: | :-----: |
| <a href="#step-3-1-keycloak-aurora-serveless-from-existing-vpc">选项一：从现有的 VPC 中部署基于 Aurora Serverless MySQL-Compatible 的 Keycloak</a> | 现有 | Aurora Serverless MySQL-Compatible | [海外区域][Keycloak aurora serveless from existing VPC for Global] </br> [中国区域][Keycloak aurora serveless from existing VPC for China] | [下载][Keycloak aurora serverless from existing VPC template] |
| <a href="#step-3-2-keycloak-aurora-serveless-from-new-vpc">选项二：从新的 VPC 中部署基于 Aurora Serverless MySQL-Compatible 的 Keycloak</a> | 新建 | Aurora Serverless MySQL-Compatible | [海外区域][Keycloak aurora serveless from new VPC for Global] </br> [中国区域][Keycloak aurora serveless from new VPC for China] | [下载][Keycloak aurora serverless from new VPC template] |
| <a href="#step-3-3-keycloak-rds-from-existing-vpc">选项三：从现有的 VPC 中部署基于 Aurora MySQL-Compatible 的 Keycloak</a> | 现有 | Aurora MySQL-Compatible | [海外区域][Keycloak from existing VPC for Global] </br> [中国区域][Keycloak from existing VPC for China] | [下载][Keycloak from existing VPC template] |
| <a href="#step-3-4-keycloak-rds-from-new-vpc">选项四：从新的 VPC 中部署基于 Aurora MySQL-Compatible 的 Keycloak</a> | 新建 | Aurora MySQL-Compatible| [海外区域][Keycloak from new VPC for Global] </br> [中国区域][Keycloak from new VPC for China] | [下载][Keycloak from new VPC template] |

### <a id="step-3-1-keycloak-aurora-serveless-from-existing-vpc">选项一：从现有的 VPC 中部署基于 Aurora Serverless MySQL-Compatible 的 Keycloak</a>

1. 登录 [AWS CloudFormation][AWS CloudFormation console] 控制台。

2. 在左侧的导航窗中选择**堆栈**。

3. 点击**创建堆栈**并选择**使用新资源(标准)**。

4. 在**指定模板**部分执行以下操作：
    1. 修改**准备模板**为**模板已就绪**。
    2. 修改**模板源**为**上传模板文件**。
    3. 点击**选择文件**并选择您下载的模板文件，例如 *keycloak-aurora-serverless-from-existing-vpc.template* 。

5. 选择**下一步**。

6. 在**指定堆栈详细信息**部分执行以下操作：
    1. **堆栈名称**: 输入堆栈名称, 例如 *KeycloakOnAWS* 。
    2. **CertificateArn**: 输入<a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a>中记录的 **ARN**，例如 *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*。
    3. **Hostname**: 输入您的 Keycloak 的域名。若部署在中国区，域名需经过 ICP 备案。
    4. **VpcId**: 选择现有的VPC 。
    5. **PubSubnets**: 选择用于部署ALB的公有子网。
    6. **PrivSubnets**: 选择用于部署ECS的私有子网。
    7. **DBSubnets**: 选择用于部署数据库的私有子网。
    8. **TaskCPU**: 为运行keycloak应用的Fargate Task指定CPU，默认为4096 (4 vCPU)。详见[Task CPU和内存][task cpu and memory]。
    9. **TaskMemory**: 为运行keycloak应用的Fargate Task指定内存，默认为8192 MiB (8 GB)。请注意该值必须在您选择的TaskCPU允许的范围内，详见[Task CPU和内存][task cpu and memory]。
    10. **MinContainers**: ECS容器的最小数量，默认值是2。
    11. **MaxContainers**: ECS容器的最大数量，默认值是10。
    12. **AutoScalingTargetCpuUtilization**: 弹性伸缩的CPU利用率百分比，默认值是75，最大值是100。
    13. **JavaOpts**: JAVA_OPTS 参数。

7. 选择**下一步**。

8. 在**配置堆栈选项** 中可以添加 tags 。

9. 选择**下一步**。

10. 评审堆栈的配置信息，如您已确定配置信息，请勾选 **我确认，Amazon CloudFormation 可能创建 IAM 资源**。

11. 选择**创建堆栈**。

### <a id="step-3-2-keycloak-aurora-serveless-from-new-vpc">选项二：从新的 VPC 中部署基于 Aurora Serverless MySQL-Compatible 的 Keycloak</a>

1. 登录 [AWS CloudFormation][AWS CloudFormation console] 控制台。

2. 在左侧的导航窗中选择**堆栈**。

3. 点击**创建堆栈**并选择**使用新资源(标准)**。

4. 在**指定模板**部分执行以下操作：
    1. 修改**准备模板**为**模板已就绪**。
    2. 修改**模板源**为**上传模板文件**。
    3. 点击**选择文件**并选择您下载的模板文件，例如 *keycloak-aurora-serverless-from-new-vpc.template* 。

5. 选择**下一步**。

6. 在**指定堆栈详细信息**部分执行以下操作：
    1. **堆栈名称**: 输入堆栈名称, 例如 *KeycloakOnAWS* 。
    2. **CertificateArn**: 输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **ARN**，例如 *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*。
    3. **Hostname**: 输入您的 Keycloak 的域名。若部署在中国区，域名需经过 ICP 备案。
    4. **TaskCPU**: 为运行keycloak应用的Fargate Task指定CPU，默认为4096 (4 vCPU)。详见[Task CPU和内存][task cpu and memory]。
    5. **TaskMemory**: 为运行keycloak应用的Fargate Task指定内存，默认为8192 MiB (8 GB)。请注意该值必须在您选择的TaskCPU允许的范围内，详见[Task CPU和内存][task cpu and memory]。
    6. **MinContainers**: ECS容器的最小数量，默认值是2。
    7. **MaxContainers**: ECS容器的最大数量，默认值是10。
    8. **AutoScalingTargetCpuUtilization**: 弹性伸缩的CPU利用率百分比，默认值是75，最大值是100。
    9. **JavaOpts**: JAVA_OPTS 参数。

7. 选择**下一步**。

8. 在**配置堆栈选项** 中可以添加 tags 。

9. 选择**下一步**。

10. 评审堆栈的配置信息，如您已确定配置信息，请勾选 **我确认，Amazon CloudFormation 可能创建 IAM 资源**。

11. 选择**创建堆栈**。

### <a id="step-3-3-keycloak-rds-from-existing-vpc">选项三：从现有的 VPC 中部署基于 Aurora MySQL-Compatible 的 Keycloak</a>

1. 登录 [AWS CloudFormation][AWS CloudFormation console] 控制台。

2. 在左侧的导航窗中选择**堆栈**。

3. 点击**创建堆栈**并选择**使用新资源(标准)**。

4. 在**指定模板**部分执行以下操作：
    1. 修改**准备模板**为**模板已就绪**。
    2. 修改**模板源**为**上传模板文件**。
    3. 点击**选择文件**并选择您下载的模板文件，例如 *keycloak-from-existing-vpc.template* 。

5. 选择**下一步**。

6. 在**指定堆栈详细信息**部分执行以下操作：
    1. **堆栈名称**: 输入堆栈名称, 例如 *KeycloakOnAWS* 。
    2. **CertificateArn**: 输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **ARN**，例如 *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*。
    3. **Hostname**: 输入您的 Keycloak 的域名。若部署在中国区，域名需经过 ICP 备案。
    4. **DatabaseInstanceType**: 选择数据库实例类型。
    5. **VpcId**: 选择现有的VPC 。
    6. **PubSubnets**: 选择用于部署ALB的公有子网。
    7. **PrivSubnets**: 选择用于部署ECS的私有子网。
    8. **DBSubnets**: 选择用于部署数据库的私有子网。
    9. **TaskCPU**: 为运行keycloak应用的Fargate Task指定CPU，默认为4096 (4 vCPU)。详见[Task CPU和内存][task cpu and memory]。
    10. **TaskMemory**: 为运行keycloak应用的Fargate Task指定内存，默认为8192 MiB (8 GB)。请注意该值必须在您选择的TaskCPU允许的范围内，详见[Task CPU和内存][task cpu and memory]。
    11. **MinContainers**: ECS容器的最小数量，默认值是2。
    12. **MaxContainers**: ECS容器的最大数量，默认值是10。
    13. **AutoScalingTargetCpuUtilization**: 弹性伸缩的CPU利用率百分比，默认值是75，最大值是100。
    14. **JavaOpts**: JAVA_OPTS 参数。

7. 选择**下一步**。

8. 在**第3步 配置堆栈选项** 中可以添加 tags 。

9. 选择**下一步**。

10. 评审堆栈的配置信息，如您已确定配置信息，请勾选 **我确认，Amazon CloudFormation 可能创建 IAM 资源**。

11. 选择**创建堆栈**。

### <a id="step-3-4-keycloak-rds-from-new-vpc">选项四：从新的 VPC 中部署基于 Aurora MySQL-Compatible 的 Keycloak</a>

1. 登录 [AWS CloudFormation][AWS CloudFormation console] 控制台。

2. 在左侧的导航窗中选择**堆栈**。

3. 点击**创建堆栈**并选择**使用新资源(标准)**。

4. 在**指定模板**部分执行以下操作：
    1. 修改**准备模板**为**模板已就绪**。
    2. 修改**模板源**为**上传模板文件**。
    3. 点击**选择文件**并选择您下载的模板文件，例如 *keycloak-from-new-vpc.template* 。

5. 选择**下一步**。

6. 在**指定堆栈详细信息**部分执行以下操作：
    1. **堆栈名称**: 输入堆栈名称, 例如 *KeycloakOnAWS* 。
    2. **CertificateArn**: 输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **ARN**，例如 *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*。
    3. **Hostname**: 输入您的 Keycloak 的域名。若部署在中国区，域名需经过 ICP 备案。
    4. **DatabaseInstanceType**: 选择数据库实例类型。
    5. **TaskCPU**: 为运行keycloak应用的Fargate Task指定CPU，默认为4096 (4 vCPU)。详见[Task CPU和内存][task cpu and memory]。
    6. **TaskMemory**: 为运行keycloak应用的Fargate Task指定内存，默认为8192 MiB (8 GB)。请注意该值必须在您选择的TaskCPU允许的范围内，详见[Task CPU和内存][task cpu and memory]。
    7. **MinContainers**: ECS容器的最小数量，默认值是2。
    8. **MaxContainers**: ECS容器的最大数量，默认值是10。
    9. **AutoScalingTargetCpuUtilization**: 弹性伸缩的CPU利用率百分比，默认值是75，最大值是100。
    10. **JavaOpts**: JAVA_OPTS 参数。

7. 选择**下一步**。

8. 在**配置堆栈选项** 中可以添加 tags 。

9. 选择**下一步**。

10. 评审堆栈的配置信息，如您已确定配置信息，请勾选 **我确认，Amazon CloudFormation 可能创建 IAM 资源**。

11. 选择**创建堆栈**。

## <a id="step-4-create-a-record-in-route-53-for-resolving-the-domain-name">步骤 4. 在 Route 53 中创建记录以解析域名</a>

1. 登录 [AWS CloudFormation][AWS CloudFormation console] 控制台。

2. 在左侧的导航窗中选择**堆栈**。

3. 选择新建的**堆栈名称**查看详细信息。

4. 选择**输出**。

5. 在搜索框中输入 **KeyCloakKeyCloakContainerSerivceEndpointURL** 并敲击回车，复制返回结果中的**值**，例如 *Keycl-KeyCl-1WIJGTSV19UTB-541714271.xx-xxx-1.elb.amazonaws.com*。

6. 登录 [Amazon Route 53][Amazon Route 53 console] 控制台。

7. 在左侧的导航窗中选择**托管区域**。

8. 点击**域名**查看详细信息。在新打开的页面中点击**创建记录**并执行以下操作:
    1. 在**记录名称**中输入Keycloak的子域名，例如 *keycloak.yourdomain.com* 。
    2. 修改**记录类型** 为 **CNAME** 。
    3. 在**值**中输入第5步中复制的**KeyCloakKeyCloakContainerSerivceEndpointURL** 的 **值** ，例如 *Keycl-KeyCl-1WIJGTSV19UTB-541714271.xx-xxx-1.elb.amazonaws.com* 。

9. 选择**创建记录**。

## <a id="step-5-browser-the-keycloak-web-console">步骤 5. 访问 Keycloak Web 控制台</a>

1. 登录 [AWS Secrets Manager][AWS Secrets Manager console] 控制台 。

2. 在顶部的导航栏中选择您的Keycloak部署的**区域**。

3. 在左侧的导航窗中选择**密钥**。

4. 在过滤框中输入 **KeyCloakKCSecret** 并敲击回车。点击查询出的结果，例如 *KeyCloakKCSecretF8498E5C-VVSujKlsllRI* 。

5. 点击**密钥值**中的**检索密钥值**按钮。

6. 复制 **username** 和 **password** 。

7. 在浏览器中输入**您的 Keycloak 域名**，例如 *https://keycloak.yourdomain.com* 。

8. 点击 **Administration Console** 链接 。

9. 输入第6步中复制的 **username** 和 **password** ，点击 **Sign In** 。
![keycloak-login](../../images/implementation-guide/deployment/17-en-keycloak-login.png)

<!--
10. Click on the drop-down list to the right of **Master** and click **Add realm**.

11. Enter a Name, such as **iotrealm**, and choose **Create**.
![keycloak-login](../../images/implementation-guide/deployment/20-en-keycloak-add-realm-01.png)

 -->

[AWS Certificate Manager]: https://amazonaws.cn/certificate-manager/
[AWS Certificate Manager console]: https://console.aws.amazon.com/acm/home
[AWS CloudFormation console]: https://console.aws.amazon.com/cloudformation/home
[Amazon EC2 console]: https://console.aws.amazon.com/ec2
[AWS Secrets Manager console]: https://console.aws.amazon.com/secretsmanager
[Amazon Route 53 console]: https://console.aws.amazon.com/route53
[Configuring Amazon Route 53 as your DNS service]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html
[Keycloak aurora serveless from existing VPC for China]: https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serveless from new VPC for China]: https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-new-vpc.template
[Keycloak from existing VPC for China]: https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-existing-vpc.template
[Keycloak from new VPC for China]: https://console.amazonaws.cn/cloudformation/home?#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-new-vpc.template
[Keycloak aurora serveless from existing VPC for Global]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serveless from new VPC for Global]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-new-vpc.template
[Keycloak from existing VPC for Global]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-existing-vpc.template
[Keycloak from new VPC for Global]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-new-vpc.template
[Keycloak aurora serverless from existing VPC template]: https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serverless from new VPC template]: https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-aurora-serverless-from-new-vpc.template
[Keycloak from existing VPC template]: https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-existing-vpc.template
[Keycloak from new VPC template]: https://aws-gcr-solutions.s3.cn-north-1.amazonaws.com.cn/keycloakonaws/latest/keycloak-from-new-vpc.template
[comparisons]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.upgrade.html#Serverless.v1-v2-requirements
[task cpu and memory]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/fargate-task-defs.html#fargate-tasks-size




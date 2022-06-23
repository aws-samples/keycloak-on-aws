# 在 AWS 中国区域部署

**部署时间**：大约 30 分钟

## 部署概述

使用以下步骤在 AWS 上部署此解决方案：

<a href="#step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a>

<a href="#step-2-create-authentication-domain">步骤 2. 创建认证域</a>

<a href="#step-3-launch-the-stack">步骤 3. 启动堆栈</a>

<a href="#step-4-create-a-record-in-route-53-for-resolving-the-domain-name">步骤 4. 在 Route 53 中创建记录以解析域名</a>

<a href="#step-5-browser-the-keycloak-web-console">步骤 5. 浏览 Keycloak Web 控制台</a>

## <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a>

为了确保 Keycloak 可以连接到 Cognito 身份池，需要确保 Keycloak 提供 HTTPS 服务。 这意味着必须使用 ACM 证书或第三方证书。 有关如何使用的详细信息，请参阅 [How to upload an SSL certificate and import it into AWS Identity and Access Management (IAM)](https://aws.amazon.com/cn/premiumsupport/knowledge-center/import-ssl-certificate-to-iam/).

本部署指南以 AWS Certificate Manager (ACM) 的使用为例。有关 ACM 的更多信息，请参阅 [Amazon Certificate Manager][Amazon Certificate Manager] 。

1. 打开 [AWS Certificate Manager][AWS Certificate Manager console] 控制台 ；

2. 在顶部的导航条中，选择 Keycloak想要部署的 **Region** ；

3. 在左侧的导航窗中，选择 **List certificates** ；

4. 点击 **Request** ；

5. 对于 **Request Public certificate** 部分需要做以下操作：
    1. 在 **Domain name** 中输入你的 Keycloak 的域名，例如 *keycloak.yourdomain.com* ；
    2. 修改 **Select validation method** 为 **DNS validation - recommended** 。

6. 点击 **Request** ；

7. 查看 **Certificates** 列表, 新申请的 Certificate ID 的 **Status** 处于 **Pending validation** ；

8. 点击新申请的 **Certificate ID** 查看详细信息. 在新打开的页面中记录以下内容:
    1. **Certificate status** 中的 **ARN**；
    2. **Domains** 中的 **CNAME name**；
    3. **Domains** 中的 **CNAME value**。

## <a id="step-2-create-authentication-domain">步骤 2. 创建认证域</a>

将 Cname 记录添加到 Route 53 以验证域名是否归您所有并可供您使用。如果未创建托管区域，请参考 [将 Amazon Route 53 配置为 DNS 服务][Configuring Amazon Route 53 as your DNS service]。

1. 打开 [Amazon Route 53][Amazon Route 53 console] 控制台 ；

2. 在左侧打导航窗中，选择 **Hosted zones** ；

3. 点击 **Domain name** 查看详细信息，在新打开的页面中点击 **Create record** ，并做以下操作：
    1. 在 **Record name** 中输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **CNAME name**，例如 ***_5db1a2688389b3b76ef6e2accaf9a85d.keycloak.en.**keycloak.yourdomain.com* ；
    2. 修改 **Record Type** 为 **CNAME** ；
    3. 在 **Value** 中输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **CNAME value** ，例如 *_1e9108227615sd40f3a767a9dc7a29cb.bpxxncpwjz.acm-validations.aws.* 。

4. 点击 **Create records** ；

5. 返回到 [AWS Certificate Manager][AWS Certificate Manager console] 控制台并等待大约5分钟，点击 **Refresh** 按钮，直到 ACM 证书的 **Status** 变为 **Issued**。

## <a id="step-3-launch-the-stack">步骤 3. 启动堆栈</a>

您可以使用以下链接快速启动 CloudFormation 堆栈以部署和管理整个解决方案。

|快速启动链接|描述|
|---|:---|
|[Keycloak aurora serveless from existing VPC][Keycloak aurora serveless from existing VPC]|从现有 VPC 中部署 AuroraServerless 作为数据库的 Keycloak。|
|[Keycloak aurora serveless from new VPC][Keycloak aurora serveless from new VPC]|部署时创建新的VPC，并使用 AuroraServerless 作为数据库的 Keycloak。|
|[Keycloak from existing VPC][Keycloak from existing VPC]|从现有 VPC 中部署 RDS MySQL 作为数据库的 Keycloak|
|[Deploy keycloak from new VPC][Keycloak from new VPC]|部署时创建新的VPC，并使用 RDS MySQL 作为数据库的 Keycloak。|

|模版下载链接|
|:---|
|[Keycloak aurora serverless from existing VPC][Keycloak aurora serverless from existing VPC template]|
|[Keycloak aurora serverless from new VPC][Keycloak aurora serverless from new VPC template]|
|[Keycloak from existing VPC][Keycloak from existing VPC template]|
|[Keycloak from new VPC][Keycloak from new VPC template]|

### 步骤 3.1. 从新的VPC中部署Keycloak

1. 打开 [AWS CloudFormation][AWS CloudFormation console] 控制台 ；

2. 在左侧的导航窗中选择 **Stacks** ；

3. 点击 **Create stacks** 并选择 **With new resources(standard)** ；

4. 在 **Specify template** 部分做以下操作：
    1. 修改 **Prepare template** 为 **Template is ready** ；
    2. 修改 **Template source** 为 **Upload a template file** ；
    3. 点击 **Choose file** 并选择您下载的模版文件。

5. 点击 **Next** ；

6. 在 **Specify template** 部分做以下操作：
    1. **Stack name**: 输入堆栈名称, 例如 KeycloakOnAWS ；
    2. **CertificateArn**: 输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **ARN**，例如 *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*。
    3. **DatabaseInstanceType**: 选择数据库实例类型 ；
    4. **MinContainers**: ECS容器的最小数量，默认值是2 ；
    5. **MaxContainers**: ECS容器的最大数量，默认值是10 ；
    6. **AutoScalingTargetCpuUtilization**: 弹性伸缩的CPU利用率百分比，默认值是75，最大值是100 ；
    8. **JavaOpts**: JAVA_OPTS 参数 。

7. 点击 **Next** ；

8. 在 **Configure Stack options** 中可以添加 tags ；

9. 点击 **Next** ；

10. 评审堆栈的配置信息，如您已确定配置信息，请勾选 **I acknowledge that AWS CloudFormation might create IAM resources** ；

11. 点击 **Create stack**。

### 步骤 3.2. 从现有的VPC中部署 Keycloak

1. 打开 [AWS CloudFormation][AWS CloudFormation console] 控制台 ；

2. 在左侧的导航窗中选择 **Stacks** ；

3. 点击 **Create stacks** 并选择 **With new resources(standard)** ；

4. 在 **Specify template** 部分做以操作：
    1. 修改 **Prepare template** 为 **Template is ready** ；
    2. 修改 **Template source** 为 **Upload a template file** ；
    3. 点击 **Choose file** 并选择您下载的模版文件。

5. 点击 **Next** ；

6. 在 **Specify template** 部分做以下操作：
    1. **Stack name**: 输入堆栈名称, 例如 KeycloakOnAWS ；
    2. **CertificateArn**: 输入 <a id="step-1-create-acm-certificate">步骤 1. 创建 ACM 证书</a> 中记录的 **ARN**，例如 *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*。
    3. **DatabaseInstanceType**: 选择数据库实例类型 ；
    4. **VpcId**: 选择现有的VPC ；
    5. **PubSubnets**: 选择用于部署ALB的公有子网 ；
    6. **PrivSubnets**: 选择用于部署ECS的私有子网 ；
    7. **DBSubnets**: 选择用于部署数据库的私有子网 ；
    8. **MinContainers**: ECS容器的最小数量，默认值是2 ；
    9. **MaxContainers**: ECS容器的最大数量，默认值是10 ；
    10. **AutoScalingTargetCpuUtilization**: 弹性伸缩的CPU利用率百分比，默认值是75，最大值是100 ；
    11. **JavaOpts**: JAVA_OPTS 参数 。

7. 点击 **Next** ；

8. 在 **Configure Stack options** 中可以添加 tags ；

9. 点击 **Next** ；

10. 评审堆栈的配置信息，如您已确定配置信息，请勾选 **I acknowledge that AWS CloudFormation might create IAM resources** ；

11. 点击 **Create stack**。

您的堆栈可能需要 30 分钟才能创建完成。

## <a id="step-4-create-a-record-in-route-53-for-resolving-the-domain-name">步骤 4. 在 Route 53 中创建记录以解析域名</a>

1. 打开 [Amazon EC2][Amazon EC2 console] 控制台 ；

2. 在左侧的导航窗中选择 **Load Balancers** ；

3. 在搜索框中输入 **Keycl** 后敲击回车。 选中查询出的结果，例如 **Keycl-KeyCl-1F1AP3ZY7AJ5U** ；

4. 复制 **Description** 中的 **DNS name** 信息 ；

5. 打开 [Amazon Route 53][Amazon Route 53 console] 控制台 ；

6. 在左侧的导航窗中选择 **Hosted zones** ；

7. 点击 **Domain name** 查看详细信息。在新打开的页面中点击 **Create record** 并做以下操作:
    1. 在 **Record name** 中输入Keycloak的子域名，例如 *keycloak.yourdomain.com* ；
    2. 修改 **Record Type** 为 **CNAME** ；
    3. 在 **Value** 输入 第4步中复制的 **DNS name** ，例如 *Keycl-KeyCl-1FAA3ZY7AJ5U-23093259.us-west-2.elb.amazonaws.com* 。

8. 点击 **Create records** 。

## <a id="step-5-browser-the-keycloak-web-console">步骤 5. 浏览 Keycloak Web 控制台</a>

1. 打开 [AWS Secrets Manager][AWS Secrets Manager console] 控制台 ；

2. 在顶部的导航栏中选择您的Keycloak部署的 **Region** ；

3. 在左侧的导航窗中选择 **Secrets** ；

4. 在过滤框中输入 **KeyCloakKCSecret** 并敲击回车。点击查询出的结果，例如 **KeyCloakKCSecretF8498E5C-VVSujKlsllRI** ；

5. 点击 **Secret value** 中的 **Retrieve secret value** 按钮 ；

6. 复制 **username** 和 **password** ；

7. 在浏览器中输入 **您的 Keycloak 域名** ，例如 *https://keycloak.yourdomain.com* ；
![keycloak-login](../../images/implementation-guide/deployment/16-en-keycloak-index.png)

8. 点击 **Administration Console** 链接 ；

9. 输入第6步中复制的 **username** 和 **password** ，点击 **Sign In** 。
![keycloak-login](../../images/implementation-guide/deployment/17-en-keycloak-login.png)

<!--
10. Click on the drop-down list to the right of **Master** and click **Add realm**.

11. Enter a Name, such as **iotrealm**, and choose **Create**.
![keycloak-login](../../images/implementation-guide/deployment/20-en-keycloak-add-realm-01.png)

 -->

[Amazon Certificate Manager]: https://amazonaws.cn/certificate-manager/
[AWS Certificate Manager console]: https://console.amazonaws.cn/acm/home
[AWS CloudFormation console]: https://console.amazonaws.cn/cloudformation/home
[Amazon EC2 console]: https://console.amazonaws.cn/ec2
[AWS Secrets Manager console]: https://console.amazonaws.cn/secretsmanager
[Amazon Route 53 console]: https://console.amazonaws.cn/route53
[Configuring Amazon Route 53 as your DNS service]: https://docs.amazonaws.cn/Route53/latest/DeveloperGuide/dns-configuring.html
[Keycloak aurora serveless from existing VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serveless from new VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from existing VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from new VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serverless from existing VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serverless from new VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from existing VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from new VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template



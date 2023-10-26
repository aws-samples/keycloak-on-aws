Before you launch the solution, review the architecture, supported regions, and other considerations discussed in this guide. Follow the step-by-step instructions in this section to configure and deploy the solution into your account.

**Time to deploy**: Approximately 30 minutes

## Prerequisites

Make sure you have the following in the target region you want to deploy the solution:

- for deployments in China region, the domain name has been recorded by ICP and used to apply for ACM certificate.
- the certificate of the domain name is created in ACM and verified by the domain name.
- VPC with 4 subnets (including two public subnets and two private subnets) and NAT Gateway.
- all the AWS Services listed in [required AWS Services](./additional-resources.md) are available.

## Deployment Overview

Use the following steps to deploy this solution on AWS.

[Step 1. Create ACM certificate](#step-1-create-acm-certificate)

[Step 2. Validate domain ownership](#step-2-validate-domain-ownership)

[Step 3. Launch the stack](#step-3-launch-the-stack)

[Step 4. Create a record in Route 53 for resolving the domain name](#step-4-create-a-record-in-route-53-for-resolving-the-domain-name)

[Step 5. Access the Keycloak web console](#step-5-accsess-the-keycloak-web-console)


## Step 1. Create ACM certificate

Keycloak is required to provide HTTPS service to ensure that Keycloak can connect to the Cognito Identity pool. This means that an ACM certificate or a third-party certificate must be used. For more information, refer to [How to upload an SSL certificate and import it into AWS Identity and Access Management (IAM)](https://aws.amazon.com/premiumsupport/knowledge-center/import-ssl-certificate-to-iam/).

This guide illustrates the use of AWS Certificate Manager (ACM) as an example. For more information, refer to [AWS Certificate Manager][AWS Certificate Manager].

1. Log in to the [AWS Certificate Manager][AWS Certificate Manager console] console.

2. From the top navigation bar, select a **Region** where you want to deploy Keycloak.

3. In the left navigation pane, choose **List certificates**.

4. Choose **Request**.

5. If you choose to deploy in the AWS Global Regions, choose **Request Public certificate**. If you choose to deploy in the AWS China Regions, only the option **Request Public certificate** is available, choose it. Then, choose **Next**.

6. On the **Request Public certificate** page, do the following:
    1. In the **Domain names** section, enter your domain name for your Keycloak service, such as *keycloak.yourdomain.com*.
    2. In the **Select validation method** section, choose **DNS validation - recommended**.

7. Choose **Request**.

8. In the **Certificates** list, the **Status** of the new requested Certificate ID is **Pending validation**.

9. Choose the new requested **Certificate ID** to show detailed metadata for a listed certificate. 

10. In the page that Log in tos, record the following information:
    1. **ARN** in the **Certificate status** section.
    2. **CNAME name** in the **Domains** section.
    3. **CNAME value** in the **Domains** section.

## Step 2. Validate domain ownership

> **_NOTE:_** The following is to verify domain ownership through Route 53. If you use other Domain Name System (DNS), refer to the DNS provider documentation to verify your domain name ownership.

Add a CNAME record to Route 53 to authenticate that the domain name is owned and available to you. If no hosted zone has been created, refer to [Configuring Amazon Route 53 as your DNS service][Configuring Amazon Route 53 as your DNS service].

1. Log in to the [Amazon Route 53][Amazon Route 53 console] console.

2. In the left navigation pane, choose **Hosted zones**.

3. Choose **Domain name** to show detailed metadata for a listed Hosted zones. 

4. In the page that Log in tos, choose **Create record**, do the following:
    1. For **Record name**, enter the part of **CNAME name** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *_5db1a2688389b3b76ef6e2accaf9a85d.keycloak.yourdomain.com*.
    2. For **Record Type**, choose **CNAME**.
    3. For **Value**, enter the **CNAME value** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *_1e9108227615sd40f3a767a9dc7a29cb.bpxxncpwjz.acm-validations.aws.*.

5. Choose **Create records**.

6. Go back to [AWS Certificate Manager][AWS Certificate Manager console] console and wait for about 5 minutes. Click the **Refresh** button, and wait until **Status** of ACM certificate changed to **Issued**.

## Step 3. Launch the stack

You have 4 different options to launch the stack.

For Aurora Serverless deployments, Aurora Serverless v2 MySQL-Compatible is provided by default in the CloudFormation templates. For more information, see [Comparison of Aurora Serverless v2 and Aurora Serverless v1 requirements][comparisons]. 


| Option | VPC | Database | Quick Launch | Template Link |
| :--- | --- | ----- | :--------: | :-----: |
| <a href="#step-3-1-keycloak-aurora-serveless-from-existing-vpc">Option 1: Deploy Keycloak based on Aurora Serverless MySQL-Compatible from an existing VPC</a> | Existing | Aurora Serverless MySQL-Compatible | [Global][Keycloak aurora serveless from existing VPC for Global] </br> [China][Keycloak aurora serveless from existing VPC for China] | [Download][Keycloak aurora serverless from existing VPC template] |
|  <a href="#step-3-2-keycloak-aurora-serveless-from-new-vpc">Option 2: Deploy Keycloak based on Aurora Serverless MySQL-Compatible from a new VPC</a> | New | Aurora Serverless MySQL-Compatible | [Global][Keycloak aurora serveless from new VPC for Global] </br> [China][Keycloak aurora serveless from new VPC for China] | [Download][Keycloak aurora serverless from new VPC template] |
| <a href="#step-3-3-keycloak-rds-from-existing-vpc">Option 3: Deploy Keycloak based on Aurora MySQL-Compatible from an existing VPC</a> | Existing | Aurora MySQL-Compatible | [Global][Keycloak from existing VPC for Global] </br> [China][Keycloak from existing VPC for China] | [Download][Keycloak from existing VPC template] |
| <a href="#step-3-4-keycloak-rds-from-new-vpc">Option 4: Deploy Keycloak based on Aurora MySQL-Compatible from a new VPC</a> | New | Aurora MySQL-Compatible| [Global][Keycloak from new VPC for Global] </br> [China][Keycloak from new VPC for China] | [Download][Keycloak from new VPC template] |

### <a id="step-3-1-keycloak-aurora-serveless-from-existing-vpc">Option 1: Deploy Keycloak based on Aurora Serverless MySQL-Compatible from an existing VPC</a>

1. Log in to the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose **Create stacks**, and choose **With new resources(standard)**.

4. On the **Step 1 Specify template** section, do the following:
    1. For **Prepare template**, choose **Template is ready**.
    2. For **Template source**, choose **Upload a template file**.
    3. Choose **Choose file**, and select the template file, such as *keycloak-aurora-serverless-from-existing-vpc.template*.

5. Choose **Next**.

6. On the **Step 2 Specify stack details** section, do the following:
    1. **Stack name**: A stack name, such as *KeycloakOnAWS*. 
    2. **CertificateArn**: Enter the **ARN** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*.
    3. **Hostname**: Enter domain name for your Keycloak server. 
    4. **VpcId**: Select from existing VPCs.
    5. **PubSubnets**: Select public subnets for ALB deployment.
    6. **PrivSubnets**: Select the private subnet for the ECS Task.
    7. **DBSubnets**: Select the private subnet for the database.
    8. **TaskCPU**: Specify the CPU for the Fargate Task running your keycloak application. The default value is 4096 (4 vCPU). See [Task CPU and memory][task cpu and memory] for details.
    9. **TaskMemory**: Specify the Memory for the Fargate Task running your keycloak application. The default value is 8192 MiB (8 GB). Please note that this value must be within the range allowed by the TaskCPU you select. See [Task CPU and memory][task cpu and memory] for details.
    8. **MinContainers**: Customize the minimum number of containers for the ECS, with a minimum value of 2.
    9. **MaxContainers**: Customize the maximum number of containers for the ECS, with a maximum value of 10.
    10. **AutoScalingTargetCpuUtilization**: The percentage of resource utilization that is ensured to be no higher, maximum 100.
    11. **JavaOpts**: JAVA_OPTS environment variable.

7. Choose **Next**.

8. On the **Step 3 Configure Stack options** section, you can add tags.

9. Choose **Next**.

10. Review the information for the stack. When you're satisfied with the settings, choose **I acknowledge that AWS CloudFormation might create IAM resources**.

11. Choose **Create stack**.

### <a id="step-3-2-keycloak-aurora-serveless-from-new-vpc">Option 2: Deploy Keycloak based on Aurora Serverless MySQL-Compatible from a new VPC</a>

1. Log in to the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose **Create stacks**, and choose **With new resources(standard)**.

4. On the **Step 1 Specify template** section, do the following:
    1. For **Prepare template**, choose **Template is ready**.
    2. For **Template source**, choose **Upload a template file**.
    3. Choose **Choose file**, and select the template file, such as *keycloak-aurora-serverless-from-new-vpc.template*.

5. Choose **Next**.

6. On the **Step 2 Specify stack details** section, do the following:
    1. **Stack name**: A stack name, such as *KeycloakOnAWS*. 
    2. **CertificateArn**: Enter the **ARN** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*.
    3. **Hostname**: Enter domain name for your Keycloak server. 
    4. **TaskCPU**: Specify the CPU for the Fargate Task running your keycloak application. The default value is 4096 (4 vCPU). See [Task CPU and memory][task cpu and memory] for details.
    5. **TaskMemory**: Specify the Memory for the Fargate Task running your keycloak application. The default value is 8192 MiB (8 GB). Please note that this value must be within the range allowed by the TaskCPU you select. See [Task CPU and memory][task cpu and memory] for details.
    6. **MinContainers**: Customize the minimum number of containers for the ECS, with a minimum value of 2.
    7. **MaxContainers**: Customize the maximum number of containers for the ECS, with a maximum value of 10.
    8. **AutoScalingTargetCpuUtilization**: The percentage of resource utilization that is ensured to be no higher, maximum 100.
    9. **JavaOpts**: JAVA_OPTS environment variable.

7. Choose **Next**.

8. On the **Step 3 Configure Stack options** section, you can add tags.

9. Choose **Next**.

10. Review the information for the stack. When you're satisfied with the settings, choose **I acknowledge that AWS CloudFormation might create IAM resources**.

11. Choose **Create stack**.

### <a id="step-3-3-keycloak-rds-from-existing-vpc">Option 3: Deploy Keycloak based on Aurora MySQL-Compatible from an existing VPC</a>

1. Log in to the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose **Create stacks**, and choose **With new resources(standard)**.

4. On the **Step 1 Specify template** section, do the following:
    1. For **Prepare template**, choose **Template is ready**.
    2. For **Template source**, choose **Upload a template file**.
    3. Choose **Choose file**, and select the template file, such as *keycloak-from-existing-vpc.template*.

5. Choose **Next**.

6. On the **Step 2 Specify stack details** section, do the following:
    1. **Stack name**: A stack name, such as *KeycloakOnAWS*. 
    2. **CertificateArn**: Enter the **ARN** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*.
    3. **Hostname**: Enter domain name for your Keycloak server. 
    4. **DatabaseInstanceType**: Select the RDS instance type.
    5. **VpcId**: Select from existing VPCs.
    6. **PubSubnets**: Select public subnets for ALB deployment.
    7. **PrivSubnets**: Select the private subnet for the ECS Task.
    8. **DBSubnets**: Select the private subnet for the RDS database.
    9. **TaskCPU**: Specify the CPU for the Fargate Task running your keycloak application. The default value is 4096 (4 vCPU). See [Task CPU and memory][task cpu and memory] for details.
    10. **TaskMemory**: Specify the Memory for the Fargate Task running your keycloak application. The default value is 8192 MiB (8 GB). Please note that this value must be within the range allowed by the TaskCPU you select. See [Task CPU and memory][task cpu and memory] for details.
    11. **MinContainers**: Customize the minimum number of containers for the ECS, with a minimum value of 2.
    10. **MaxContainers**: Customize the m2ximum number of containers for the ECS, with a maximum value of 10.
    13. **AutoScalingTargetCpuUtilization**: The percentage of resource utilization that is ensured to be no higher, maximum 100.
    14. **JavaOpts**: JAVA_OPTS environment variable.

7. Choose **Next**.

8. On the **Step 3 Configure Stack options** section, you can add tags.

9. Choose **Next**.

10. Review the information for the stack. When you're satisfied with the settings, choose **I acknowledge that AWS CloudFormation might create IAM resources**.

11. Choose **Create stack**.

### <a id="step-3-4-keycloak-rds-from-new-vpc">Option 4: Deploy Keycloak based on Aurora MySQL-Compatible from a new VPC</a>

1. Log in to the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose **Create stacks**, and choose **With new resources(standard)**.

4. On the **Step 1 Specify template** section, do the following:
    1. For **Prepare template**, choose **Template is ready**.
    2. For **Template source**, choose **Upload a template file**.
    3. Choose **Choose file**, and select the template file, such as *keycloak-from-new-vpc.template*.

5. Choose **Next**.

6. On the **Step 2 Specify stack details** section, do the following:
    1. **Stack name**: A stack name, such as *KeycloakOnAWS*. 
    2. **CertificateArn**: Enter the **ARN** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272`*.
    3. **Hostname**: Enter domain name for your Keycloak server. 
    4. **DatabaseInstanceType**: Select the RDS instance type.
    5. **TaskCPU**: Specify the CPU for the Fargate Task running your keycloak application. The default value is 4096 (4 vCPU). See [Task CPU and memory][task cpu and memory] for details.
    6. **TaskMemory**: Specify the Memory for the Fargate Task running your keycloak application. The default value is 8192 MiB (8 GB). Please note that this value must be within the range allowed by the TaskCPU you select. See [Task CPU and memory][task cpu and memory] for details.
    7. **MinContainers**: Customize the minimum number of containers for the ECS, with a minimum value of 2.
    8. **MaxContainers**: Customize the maximum number of containers for the ECS, with a maximum value of 10.
    9. **AutoScalingTargetCpuUtilization**: The percentage of resource utilization that is ensured to be no higher, maximum 100.
    10. **JavaOpts**: JAVA_OPTS environment variable.

7. Choose **Next**.

8. On the **Step 3 Configure Stack options** section, you can add tags.

9. Choose **Next**.

10. Review the information for the stack. When you're satisfied with the settings, choose **I acknowledge that AWS CloudFormation might create IAM resources**.

11. Choose **Create stack**.


## Step 4. Create a record in Route 53 for resolving the domain name

1. Log in to the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose the new created **Stack name** to show detailed metadata, such as *KeycloakOnAWS*. 

4. Choose **Outputs**.

5. Enter `KeyCloakKeyCloakContainerSerivceEndpointURL` in the Filter box, and click Enter. List filtered result, such as *KeyCloakKeyCloakContainerSerivceEndpointURL9C81E19A*.

6. Copied the **Value**, such as *Keycl-KeyCl-1WIJGTSV19UTB-541714271.xx-xxx-1.elb.amazonaws.com*.

7. Log in to the [Amazon Route 53][Amazon Route 53 console] console.

8. In the left navigation pane, choose **Hosted zones**.

9. Choose **Domain name** to show detailed metadata for a listed Hosted zones. Choose **Create record**, do the following:
    1. For **Record name**, enter subdomain for your keycloak services, such as *keycloak.yourdomain.com*.
    2. For **Record Type**, choose **CNAME**.
    3. For **Value**, paste the **DNS name** copied earlier, such as *Keycl-KeyCl-1WIJGTSV19UTB-541714271.xx-xxx-1.elb.amazonaws.com*.

10. Choose **Create records**.

## Step 5. Access the Keycloak web console

1. Log in to the [AWS Secrets Manager][AWS Secrets Manager console] console.

2. From the top navigation bar, select the **Region** where your keycloak deployed.

3. In the left navigation pane, choose **Secrets**.

4. Enter `KeyCloakKCSecret` in the Filter box, and click Enter. Choose filtered results, such as **KeyCloakKCSecretF8498E5C-VVSujKlsllRI**.

5. Choose **Retrieve secret value** in the **Secret value** section.

6. Copy the **username** and **password**.

7. Enter **your keycloak domain name** in the address bar of your browser, such as *https://keycloak.yourdomain.com*.

8. Click the **Administration Console** link.

9. Enter **username** and **password** copied earlier, and click **Sign In**.
![keycloak-login](../../images/implementation-guide/deployment/17-en-keycloak-login.png)

<!--
10. Click on the drop-down list to the right of **Master** and click **Add realm**.

11. Enter a Name, such as **iotrealm**, and choose **Create**.
![keycloak-login](../../images/implementation-guide/deployment/20-en-keycloak-add-realm-01.png)

 -->

[AWS Certificate Manager]: https://aws.amazon.com/certificate-manager
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
[task cpu and memory]: https://docs.aws.amazon.com/zh_cn/AmazonECS/latest/userguide/fargate-task-defs.html#fargate-tasks-size
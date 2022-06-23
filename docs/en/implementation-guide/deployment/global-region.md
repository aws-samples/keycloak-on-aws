# Deployment in AWS Standard Regions

**Time to deploy**: Approximately 30 minutes

## Deployment Overview

Use the following steps to deploy this solution on AWS.

[Step 1. Create ACM certificate](#step-1-create-acm-certificate)

[Step 2. Create Authentication Domain](#step-2-create-authentication-domain)

[Step 3. Launch the stack](#step-3-launch-the-stack)

[Step 4. Create a record in Route 53 for resolving the domain name](#step-4-create-a-record-in-route-53-for-resolving-the-domain-name)

[Step 5. Browser the Keycloak web console](#step-5-browser-the-keycloak-web-console)


## Step 1. Create ACM certificate

In order to ensure that Keycloak can connect to the Cognito Identity pool, it is necessary to ensure that Keycloak provides in HTTPS service. This means that an ACM certificate or a third-party certificate must be used. For details on how to use it, please refer to [How to upload an SSL certificate and import it into AWS Identity and Access Management (IAM)](https://aws.amazon.com/cn/premiumsupport/knowledge-center/import-ssl-certificate-to-iam/).

This deployment guide illustrates the use of AWS Certificate Manager (ACM) as an example. For more information about ACM, see [https://aws.amazon.com/cn/certificate-manager/][Amazon Certificate Manager]

1. Open the [AWS Certificate Manager][AWS Certificate Manager console] console.

2. From the top navigation bar, select a **Region** where your keycloak wants to deploy.

3. In the left navigation pane, choose **List certificates**.

4. Choose **Request**.

5. For **Certificate type**, choose **Request a public certificate**.

6. Choose **Next**.

7. For **Request Public certificate**, do the following:
    1. In the **Domain name** section, type your domain name for your Keycloak service, such as *keycloak.yourdomain.com*.
    2. In the **Select validation method** section, choose **DNS validation - recommended**.

8. Choose **Request**.

9. In the **Certificates** list, the **Status** of the new requested Certificate ID is **Pending validation**.

10. Choose the new requested **Certificate ID** to show detailed metadata for a listed certificate. A page opens, record the following information:
    1. **ARN** in the **Certificate status** section.
    2. **CNAME name** in the **Domains** section.
    3. **CNAME value** in the **Domains** section.

## Step 2. Create Authentication Domain

Add a Cname record to Route 53 to authenticate that the domain name is owned and available to you. If no hosted zone has been created, refer to [Configuring Amazon Route 53 as your DNS service][Configuring Amazon Route 53 as your DNS service].

1. Open the [Amazon Route 53][Amazon Route 53 console] console.

2. In the left navigation pane, choose **Hosted zones**.

3. Choose **Domain name** to show detailed metadata for a listed Hosted zones. A page opens, choose **Create record**, do the following:
    1. For **Record name**, type the part of **CNAME name** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as ***_5db1a2688389b3b76ef6e2accaf9a85d.keycloak.en.**keycloak.yourdomain.com*.
    2. For **Record Type**, choose **CNAME**.
    3. For **Value**, type the **CNAME value** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *_1e9108227615sd40f3a767a9dc7a29cb.bpxxncpwjz.acm-validations.aws.*.

4. Choose **Create records**.

5. Go back to [AWS Certificate Manager][AWS Certificate Manager console] console and wait for about 5 minutes. Click the **Refresh** button. Wait for the **Status** of ACM certificate to change to **Issued**.

## Step 3. Launch the stack

You can quickly start a CloudFormation stack to deploy and manage the entire solution using the following link.

|quickstart link|Description|
|---|:---|
|[Keycloak aurora serveless from existing VPC][Keycloak aurora serveless from existing VPC]|Deploying AuroraServerless from an Existing VPC as a Keycloak for the database.|
|[Keycloak aurora serveless from new VPC][Keycloak aurora serveless from new VPC]|New VPC Deployment AuroraServerless for database Keycloak.|
|[Keycloak from existing VPC][Keycloak from existing VPC]|Deploying RDS MySQL from an existing VPC as the Keycloak for the database.|
|[Deploy keycloak from new VPC][Keycloak from new VPC]|New VPC Deploying RDS MySQL as Keycloak for Database.|

|template link|
|:---|
|[Keycloak aurora serverless from existing VPC][Keycloak aurora serverless from existing VPC template]|
|[Keycloak aurora serverless from new VPC][Keycloak aurora serverless from new VPC template]|
|[Keycloak from existing VPC][Keycloak from existing VPC template]|
|[Keycloak from new VPC][Keycloak from new VPC template]|

### Step 3.1. Deploy keycloak from new VPC

1. Open the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose **Create stacks**, and choose **With new resources(standard)**.

4. On the **Specify template** section, do the following:
    1. For **Prepare template**, choose **Template is ready**.
    2. For **Template source**, choose **Upload a template file**.
    3. Choose **Choose file**, and select the template file.

5. Choose **Next**.

6. On the **Specify template** section, do the following:
    1. **Stack name**: A stack name, such as KeycloakOnAWS. 
    2. **CertificateArn**: Enter the **ARN** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as *arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272*.
    3. **DatabaseInstanceType**: Select the RDS instance type.
    4. **MinContainers**: Customize the minimum number of containers for the ECS, with a minimum value of 2.
    5. **MaxContainers**: Customize the maximum number of containers for the ECS, with a maximum value of 10.
    6. **AutoScalingTargetCpuUtilization**: The percentage of resource utilization that is ensured to be no higher, maximum 100.
    8. **JavaOpts**: JAVA_OPTS environment variable.

7. Choose **Next**.

8. On the **Configure Stack options** section, you can add tags.

9. Choose **Next**.

10. Review the information for the stack. When you're satisfied with the settings, choose **I acknowledge that AWS CloudFormation might create IAM resources**.

11. Choose **Create stack**.

### Step 3.2. Deploy keycloak from existing VPC

1. Open the [AWS CloudFormation][AWS CloudFormation console] console.

2. In the left navigation pane, choose **Stacks**.

3. Choose **Create stacks**, and choose **With new resources(standard)**.

4. On the **Specify template** section, do the following:
    1. For **Prepare template**, choose **Template is ready**.
    2. For **Template source**, choose **Upload a template file**.
    3. Choose **Choose file**, and select the template file.

5. Choose **Next**.

6. On the **Specify template** section, do the following:
    1. **Stack name**: A stack name, such as KeycloakOnAWS. 
    2. **CertificateArn**: Enter the **ARN** recorded in [Step 1. Create ACM certificate](#step-1-create-acm-certificate), such as **arn:aws:acm:us-west-2:1436237113227:certificate/571518b3-123b-4502-1ec3-3t2sae704272**.
    3. **DatabaseInstanceType**: Select the RDS instance type.
    4. **VpcId**: Select from existing VPCs.
    5. **PubSubnets**: Select public subnets for ALB deployment.
    6. **PrivSubnets**: Select the private subnet for the ECS Task.
    7. **DBSubnets**: Select the private subnet for the RDS database.
    8. **MinContainers**: Customize the minimum number of containers for the ECS, with a minimum value of 2.
    9. **MaxContainers**: Customize the maximum number of containers for the ECS, with a maximum value of 10.
    10. **AutoScalingTargetCpuUtilization**: The percentage of resource utilization that is ensured to be no higher, maximum 100.
    11. **JavaOpts**: JAVA_OPTS environment variable.

7. Choose **Next**.

8. On the **Configure Stack options** section, you can add tags.

9. Choose **Next**.

10. Review the information for the stack. When you're satisfied with the settings, choose **I acknowledge that AWS CloudFormation might create IAM resources**.

11. Choose **Create stack**.

Your stack might take 30 minutes to create.

## Step 4. Create a record in Route 53 for resolving the domain name

1. Open the [Amazon EC2][Amazon EC2 console] console.

2. In the left navigation pane, choose **Load Balancers**.

3. Enter **Keycl** in the Filter box, and click Enter. Select filtered results, such as **Keycl-KeyCl-1F1AP3ZY7AJ5U**.

4. Copied the **DNS name** in the **Description** section.

5. Open the [Amazon Route 53][Amazon Route 53 console] console.

6. In the left navigation pane, choose **Hosted zones**.

7. Choose **Domain name** to show detailed metadata for a listed Hosted zones. A page opens, choose **Create record**, do the following:
    1. For **Record name**, enter subdomain for your keycloak services, such as *keycloak.yourdomain.com*.
    2. For **Record Type**, choose **CNAME**.
    3. For **Value**, paste the **DNS name** copied earlier, such as *Keycl-KeyCl-1FAA3ZY7AJ5U-23093259.us-west-2.elb.amazonaws.com*.

8. Choose **Create records**.

## Step 5. Browser the Keycloak web console

1. Open the [AWS Secrets Manager][AWS Secrets Manager console] console.

2. From the top navigation bar, select the **Region** where your keycloak deployed.

3. In the left navigation pane, choose **Secrets**.

4. Enter **KeyCloakKCSecret** in the Filter box, and click Enter. Choose filtered results, such as **KeyCloakKCSecretF8498E5C-VVSujKlsllRI**.

5. Choose **Retrieve secret value** in the **Secret value** section.

6. Copied the **username** and **password**.

7. Enter **your keycloak domain name** in the address bar of your browser, such as *https://keycloak.yourdomain.com*.
![keycloak-login](../../images/implementation-guide/deployment/16-en-keycloak-index.png)

8. Click on the **Administration Console** link.

9. Enter **username** and **password** copied earlier, Click **Sign In**.
![keycloak-login](../../images/implementation-guide/deployment/17-en-keycloak-login.png)

<!--
10. Click on the drop-down list to the right of **Master** and click **Add realm**.

11. Enter a Name, such as **iotrealm**, and choose **Create**.
![keycloak-login](../../images/implementation-guide/deployment/20-en-keycloak-add-realm-01.png)

 -->

[Amazon Certificate Manager]: https://aws.amazon.com/cn/certificate-manager/
[AWS Certificate Manager console]: https://console.aws.amazon.com/acm/home
[AWS CloudFormation console]: https://console.aws.amazon.com/cloudformation/home
[Amazon EC2 console]: https://console.aws.amazon.com/ec2
[AWS Secrets Manager console]: https://console.aws.amazon.com/secretsmanager
[Amazon Route 53 console]: https://console.aws.amazon.com/route53
[Configuring Amazon Route 53 as your DNS service]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html
[Keycloak aurora serveless from existing VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serveless from new VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from existing VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from new VPC]: https://console.aws.amazon.com/cloudformation/home#/stacks/quickcreate?templateUrl=https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serverless from existing VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak aurora serverless from new VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from existing VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template
[Keycloak from new VPC template]: https://aws-gcr-solutions.s3.amazonaws.com/keycloakonaws/latest/keycloak-aurora-serverless-from-existing-vpc.template


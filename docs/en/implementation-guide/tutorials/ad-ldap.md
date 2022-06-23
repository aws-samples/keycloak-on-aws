# Tutorial: How to integrate Keycloak with AD/LDAP?

Keycloak allows user federation with AD/LDAP. This guide walks you through the user federation with OpenLDAP service. For more infomation, see [User Federation](https://www.keycloak.org/docs/latest/server_admin/#_user-storage-federation) from the Keycloak document.

## Prerequisities

1. **Keycloak on AWS**: We assume you have already deployed the keycloak-on-aws via CloudFormation or AWS CDK and already successfully logged in the keycload dashboard as keycloak admin user.

2. **OpenLDAP**: Keycloak supports multiple LDAP services including Microsoft AD and OpenLDAP. In the following guide, we will run an openldap service in the same VPC with the keycloak service for this demo.

## Deployment Overview

Use the following steps to deploy this solution on AWS.

[Step 1. Launch a EC2 instance for OpenLDAP](#step-1-launch-a-ec2-instance-for-openldap)

[Step 2. Install OpenLDAP](#step-2-install-openldap)

[Step 3. Create a User Federation on Keycloak](#step-3-create-a-user-federation-on-keycloak)

[Step 4. Validate the user federation](#step-4-validate-the-user-federation)

## Step 1. Launch a EC2 instance for OpenLDAP

You need to launch a EC2 instance in the same VPC with your keycloak service, and do the following.

** Configure the security group of this EC2 instance and ensure all traffic from the VPC CIDR can visit its LDAP port(TCP 389) **

1. Open the [Amazon EC2 ][Amazon EC2 console] console.

2. In the left navigation pane, choose **Security Groups**.

3. Enter **KeycloakOnAWS-KeyCloakKeyCloakContainerSerivceServiceSecurityGroup** in the Filter box, and click Enter, copied the **Security group ID**, such as *sg-0121f1140bbfd72c6*.
![01-en-ec2-keycloak-security-group-id](../../images/implementation-guide/tutorial/ad-ldap/01-en-ec2-keycloak-security-group-id.png)

4. Choose the Security Groups where your EC2 instance is located, and add an Inbound rules to allow ECS visit OpenLDAP.
![02-en-ec2-add-security-group-rules](../../images/implementation-guide/tutorial/ad-ldap/02-en-ec2-add-security-group-rules.png)

5. Choose **Save rules**.

## Step 2. Install OpenLDAP

** Install OpenLDAP with Docker in your EC2 instance **

Connect to your instance, and do the following:
```
# Install docker 
yum install -y docker
systemctl start docker
# start the docker container
docker run -p 389:1389 public.ecr.aws/bitnami/openldap:latest
```

** Open another termilal and install the openldap clients **

```
# install ldap client
yum install -y openldap-clients
# list all users
ldapsearch -x -b "ou=users,dc=example,dc=org" -H ldap://<EC2_PRIVATE_IP>
```

For example:
```
[root@xxxx ~]# ldapsearch -x -b "ou=users,dc=example,dc=org" -H ldap://<EC2_PRIVATE_IP>
# extended LDIF
#
# LDAPv3
# base <ou=users,dc=example,dc=org> with scope subtree
# filter: (objectclass=*)
# requesting: ALL
#

# users, example.org
dn: ou=users,dc=example,dc=org
objectClass: organizationalUnit
ou: users

# user01, users, example.org
dn: cn=user01,ou=users,dc=example,dc=org
cn: User1
cn: user01
sn: Bar1
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
userPassword:: Yml0bmFtaTE=
uid: user01
uidNumber: 1000
gidNumber: 1000
homeDirectory: /home/user01

# user02, users, example.org
dn: cn=user02,ou=users,dc=example,dc=org
cn: User2
cn: user02
sn: Bar2
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
userPassword:: Yml0bmFtaTI=
uid: user02
uidNumber: 1001
gidNumber: 1001
homeDirectory: /home/user02

# readers, users, example.org
dn: cn=readers,ou=users,dc=example,dc=org
cn: readers
objectClass: groupOfNames
member: cn=user01,ou=users,dc=example,dc=org
member: cn=user02,ou=users,dc=example,dc=org

# search result
search: 2
result: 0 Success

# numResponses: 5
# numEntries: 4
```

Now your default LDAP service is ready.

## Step 3. Create a User Federation on Keycloak

1. Login the Keycloak dashboard as **keycloak** admin user.

2. In the left navigation pane, choose **User Federation**.

3. Click on the **Add provider** drop-down menu, and choose **ldap**.
![03-en-keycloak-add-user-provider-01](../../images/implementation-guide/tutorial/ad-ldap/03-en-keycloak-add-user-provider-01.png)

4. A page opens, enter the following information:
    1. **Edit Mode**: Choose **WRITABLE**.
    2. **Vendor**: Choose **Other**.
    3. **Username LDAP attribute**: Enter your LDAP attribute name for username, use **cn** in this tutorial.
    4. **RDN LDAP attribute**: Enter your LDAP attribute name for user RDN, use **cn** in this tutorial.
    5. **UUID LDAP attribute**: Enter your LDAP attribute name for UUID, use **uid** in this tutorial.
    6. **User Object Classes**: Enter your LDAP User Object Classes, use **inetOrgPerson, posixAccount, shadowAccount** in this tutorial.
    7. **Connection URL**: Enter your LDAP connection URL, use **ldap://<EC2_PRIVATE_IP>** in this tutorial, and click **Test connection**, Prompt the following information "Success! LDAP connection successful.".
    8. **Users DN**: Enter your LDAP Users DN, use **ou=users,dc=example,dc=org** in this tutorial.
    9. **Bind Type**: Choose **simple**.
    10. **Bind DN**: Enter your LDAP bind DN, use **cn=admin,dc=example,dc=org** in this tutorial.
    11. **Bind Credential**: Enter your LDAP Bind Credentials, use **adminpassword** in this tutorial, and click **Test authentication**, Prompt the following information "Success! LDAP authentication successful.".

5. Choose **Save**.

6. Choose **Synchronize all users**.

7. Prompt the following information "Success! Sync of users finished successfully. 2 imported users, 0 updated users".

8. In the left navigation pane, choose **Users**.

9. Choose **View all users**, **user1** and **user2** should be imported successfully.
![04-en-keycloak-manger-users](../../images/implementation-guide/tutorial/ad-ldap/04-en-keycloak-manger-users.png)

## Step 4. Validate the user federation

Now let's validate the user federation with the **account-console** login.

1. Login the Keycloak dashboard as **keycloak** admin user.

2. In the left navigation pane, choose **Clients**.

3. Click the **Base URL** of account-console.
![05-en-keycloak-clients](../../images/implementation-guide/tutorial/ad-ldap/05-en-keycloak-clients.png)

4. You should be redirected to the Keycloak account console, click **Sign In** on the top right button. 
![06-en-keycloak-account-console-signin-01](../../images/implementation-guide/tutorial/ad-ldap/06-en-keycloak-account-console-signin-01.png)

5. Enter **user1** to Username or email, enter **bitnami1** to Password.
![06-en-keycloak-account-console-signin-02](../../images/implementation-guide/tutorial/ad-ldap/06-en-keycloak-account-console-signin-02.png)

6. Click **Sign In**, you can successfully login to the console.
![06-en-keycloak-account-console-signin-03](../../images/implementation-guide/tutorial/ad-ldap/06-en-keycloak-account-console-signin-03.png)

## FAQ

**Q: Does keycloak support ldaps protocol?**

A: Yes. both ldap:// and ldaps:// are supported. To enable ldaps://, make sure your AD/LDAP is running with LDAPS and has properly imported the certificate.

**Q: What vendor type should I select if I am running Microsoft AD server?**

A: Select Active Directory in the Vendor parameter.
![07-en-keycloak-user-federation-provider](../../images/implementation-guide/tutorial/ad-ldap/07-en-keycloak-user-federation-provider.png)


[Amazon Certificate Manager]: https://aws.amazon.com/cn/certificate-manager/
[AWS Certificate Manager console]: https://console.aws.amazon.com/acm/home
[AWS CloudFormation console]: https://console.aws.amazon.com/cloudformation/home
[Amazon EC2 console]: https://console.aws.amazon.com/ec2
[AWS Secrets Manager console]: https://console.aws.amazon.com/secretsmanager
[Amazon Route 53 console]: https://console.aws.amazon.com/route53



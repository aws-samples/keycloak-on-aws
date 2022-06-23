# 教程: 如何将 Keycloak 与 Amazon API Gateway 集成？

## 架构图例
![01-en-architecture-diagram](../../images/implementation-guide/tutorial/api-gateway/01-en-architecture-diagram.svg)

## 前提条件

1. **Keycloak on AWS**: 我们假设您已经通过 cloudformation 或 AWS CDK 部署了 keycloak-on-aws，并且已经以 keycloak 管理员用户身份成功登录了 keycload 仪表板。

    确保您在 CloudFormation 参数中填写了以下 JAVA_OPTS。
    ```
    -Dkeycloak.profile.feature.scripts=enabled -Dkeycloak.profile.feature.upload_scripts=enabled
    ```

## 部署概述

使用以下步骤在 AWS 上部署此解决方案：


<a href="#step-1-git-clone-keycloak-on-aws">步骤 1. 克隆keycloak-on-aws代码至本地</a>

<a href="#step-2-import-the-keycloak-example-config">步骤 2. 导入Keycloak示例配置文件</a>

<a href="#step-3-run-serverless-express-auth-locally">步骤 3. 在本地环境运行serverless-express-auth</a>

<a href="#step-4-run-vue-ui-locally">步骤 4. 在本地环境运行Vue UI</a>

<a href="#step-5-validate-the-user-permissions">步骤 5. 验证用户权限</a>

## <a id="step-1-git-clone-keycloak-on-aws">步骤 1. 克隆keycloak-on-aws代码至本地</a>

执行以下命令将 keycloak-on-aws 代码下载到本地。

```
git clone https://github.com/aws-samples/keycloak-on-aws.git
cd keycloak-on-aws
```

## <a id="step-2-import-the-keycloak-example-config">步骤 2. 导入Keycloak示例配置文件</a>

1. 以 **keycloak** 管理员用户身份登录 Keycloak 仪表板 ；

2. 鼠标悬浮在左侧导航窗中的 **Master** ，点击 **Add realm** ；

3. 点击 **Select file**，选中第一步下载代码中的 **tutorials/api-gateway/resoures/realm-export.json** 文件 ；
![02-en-keycloak-add-realm](../../images/implementation-guide/tutorial/api-gateway/02-en-keycloak-add-realm.png)

5. 点击 **Create** ；

## <a id="step-3-run-serverless-express-auth-locally">步骤 3. 在本地环境运行serverless-express-auth</a>

这个例子主要是基于 [expressjs](https://github.com/expressjs/express) 和官方的 [keycloak-nodejs-connect](https://github.com/keycloak/keycloak-nodejs-connect)，并使用 [serverless-express](https://github.com/vendia/serverless-express/) 使 expressjs 能够在 lambda 上运行。

这种方式的优点是 keycloak-nodejs-connect 由 keycloak 团队维护，这是连接到 keycloak 的推荐方式。
```
注意：keycloak-nodejs-connect的文件在 https://www.keycloak.org/docs/latest/securing_apps/#_nodejs_adapter
```

1. 以 **keycloak** 管理员用户身份登录 Keycloak 仪表板 ；

2. 在左侧的导航窗中选择 **Clients** ；

3. 点击 **vue** 查看详细信息 ；

4. 点击 **Installation** ；

5. 点击 **Format Option** 下拉菜单并选择 **Keycloak OIDC JSON** ；

6. 根据Keyloak Installation 中的配置向更新第一步下载代码中 **tutorials/api-gateway/resources/realm-export.json** 文件内容 ；
```
{
  "realm": "keycloak-on-aws",
  "auth-server-url": "https://keycloak.yourdomain.com/auth/",
  "ssl-required": "external",
  "resource": "vue",
  "public-client": true,
  "confidential-port": 0,
  // Don't remove the following line, this is for vue-ui to contact to api gw !!!
  "x-api-gw-url": "http://localhost:3003/dev/hello"
}
```
7. 进入 **tutorials/api-gateway/serverless-express-auth** 目录，并执行以下操作：
```
cd tutorials/api-gateway/serverless-express-auth
yarn
yarn offline
```
输出示例
```
yarn run v1.22.19
$ SLS_DEBUG=* serverless offline --host 0.0.0.0 --httpPort 3003 --lambdaPort=3019
...
offline: Offline [http for lambda] listening on http://0.0.0.0:3019
offline: Function names exposed for local invocation by aws-sdk:
           * authEndpoint: serverless-express-auth-dev-authEndpoint
           * hello: serverless-express-auth-dev-hello
[offline] Lambda Invocation Routes (for AWS SDK or AWS CLI):
           * POST http://0.0.0.0:3019/2015-03-31/functions/serverless-express-auth-dev-authEndpoint/invocations
           * POST http://0.0.0.0:3019/2015-03-31/functions/serverless-express-auth-dev-hello/invocations
[offline] Lambda Async Invocation Routes (for AWS SDK or AWS CLI):
           * POST http://0.0.0.0:3019/2014-11-13/functions/serverless-express-auth-dev-authEndpoint/invoke-async/
           * POST http://0.0.0.0:3019/2014-11-13/functions/serverless-express-auth-dev-hello/invoke-async/
offline: Configuring Authorization: hello authEndpoint
[offline] Creating Authorization scheme for hello-authEndpoint-GET-hello

   ┌───────────────────────────────────────────────────────────────────────┐
   │                                                                       │
   │   GET | http://0.0.0.0:3003/dev/hello                                 │
   │   POST | http://0.0.0.0:3003/2015-03-31/functions/hello/invocations   │
   │                                                                       │
   └───────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://0.0.0.0:3003 🚀
offline: 
offline: Enter "rp" to replay the last request
```

<!-- 
## Run serverless-lambda-auth locally

This example is mainly based on [keycloak-lambda-authorizer](https://github.com/vzakharchenko/keycloak-lambda-authorizer).

1. Go to **tutorials/api-gateway/serverless-lambda-auth** directory, do the following.
```
cd tutorials/api-gateway/serverless-lambda-auth
yarn
yarn offline
```
Sample Output
```
yarn run v1.22.19
...
offline: Offline [http for lambda] listening on http://0.0.0.0:3019
offline: Function names exposed for local invocation by aws-sdk:
           * authEndpoint: serverless-lambda-auth-dev-authEndpoint
           * hello: serverless-lambda-auth-dev-hello
[offline] Lambda Invocation Routes (for AWS SDK or AWS CLI):
           * POST http://0.0.0.0:3019/2015-03-31/functions/serverless-lambda-auth-dev-authEndpoint/invocations
           * POST http://0.0.0.0:3019/2015-03-31/functions/serverless-lambda-auth-dev-hello/invocations
[offline] Lambda Async Invocation Routes (for AWS SDK or AWS CLI):
           * POST http://0.0.0.0:3019/2014-11-13/functions/serverless-lambda-auth-dev-authEndpoint/invoke-async/
           * POST http://0.0.0.0:3019/2014-11-13/functions/serverless-lambda-auth-dev-hello/invoke-async/
offline: Configuring Authorization: hello authEndpoint
[offline] Creating Authorization scheme for hello-authEndpoint-GET-hello

   ┌───────────────────────────────────────────────────────────────────────┐
   │                                                                       │
   │   GET | http://0.0.0.0:3003/dev/hello                                 │
   │   POST | http://0.0.0.0:3003/2015-03-31/functions/hello/invocations   │
   │                                                                       │
   └───────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://0.0.0.0:3003 🚀
offline: 
offline: Enter "rp" to replay the last reques
``` 
-->

## <a id="step-4-run-vue-ui-locally">步骤 4. 在本地环境运行Vue UI</a>

```
cd tutorials/api-gateway/vue-ui
yarn
yarn serve
```
输出示例
```
yarn run v1.22.19
$ vue-cli-service serve
Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
 INFO  Starting development server...
Starting type checking service...
Using 1 worker with 2048MB memory limit
98% after emitting CopyPlugin

 DONE  Compiled successfully in 1638ms                                                3:42:04 PM

No type errors found
Version: typescript 4.2.4
Time: 1111ms

  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://localhost:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
```

## <a id="step-5-validate-the-user-permissions">步骤 5. 验证用户权限</a>

一个常见的场景是不同的用户有不同的权限来执行一个动作（允许/拒绝），此教程中内置了两个不同的用户，user1 可以调用 API gateway，而 user2 不允许。

用户:

|用户名|密码|角色|描述|
|---|---|---|:---|
|user1|user1|call-api|user1 is permited to call api gateway|
|user2|user2|-|user2 is not permited to call api gateway|

1. 打开[Vue UI][Vue UI console] 控制台 ；

2. 点击 ***Login*** ；

3. 在 Username or email中 输入 ***user1***，在 Password 中输入 ***user1*** ；
![03-en-keycloak-validate-01](../../images/implementation-guide/tutorial/api-gateway/03-en-keycloak-validate-01.png)

4. 点击 **Sign In** ；

5. 复制 **JWT Access Token**, 并构造HTTP Header头 ；
```
Authorization: Bearer <JWT Access Token>
```
6. 打开终端并执行curl命令发送HTTP请求 ；
```
curl -H 'Authorization: Bearer <JWT Access Token>' http://localhost:3003/dev/hello
```
7. 您可以获得成功的响应消息 ；
```
{"message":"Hi user1. Your function executed successfully!"}
```
8. 点击 ***Logout***.

9. 在 Username or email中 输入 ***user2***，在 Password 中输入 ***user2*** ；
![03-en-keycloak-validate-03](../../images/implementation-guide/tutorial/api-gateway/03-en-keycloak-validate-03.png)

10. 复制 **JWT Access Token**, 并构造HTTP Header头 ；
```
Authorization: Bearer <JWT Access Token>
```
11. 打开终端并执行curl命令再次发送HTTP请求 ；
```
curl -H 'Authorization: Bearer <JWT Access Token>' http://localhost:3003/dev/hello
```
12. 您可以获得失败的响应消息，状态码为 403 ；
```
{"statusCode":403,"error":"Forbidden","message":"User is not authorized to access this resource"}
```

## FAQ

Q: 如何导出 keycloak 域用户？

A: <https://stackoverflow.com/questions/60766292/how-to-get-keycloak-to-export-realm-users-and-then-exit>
```
$ docker exec <container id>
$ /opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.realmName=keycloak-on-aws -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=realm-export.json -Djboss.socket.binding.port-offset=99
```

[Amazon Certificate Manager]: https://aws.amazon.com/cn/certificate-manager/
[AWS Certificate Manager console]: https://console.aws.amazon.com/acm/home
[AWS CloudFormation console]: https://console.aws.amazon.com/cloudformation/home
[Amazon EC2 console]: https://console.aws.amazon.com/ec2
[AWS Secrets Manager console]: https://console.aws.amazon.com/secretsmanager
[Amazon Route 53 console]: https://console.aws.amazon.com/route53
[Vue UI console]: http://localhost:8080/



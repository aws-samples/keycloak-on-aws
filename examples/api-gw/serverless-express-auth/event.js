
// AUTH
{
  event: {
    enhancedAuthContext: {},
    methodArn: 'arn:aws:execute-api:us-east-1:random-account-id:random-api-id/dev/GET/hello',
    requestContext: {
      accountId: 'random-account-id',
      apiId: 'random-api-id',
      httpMethod: 'GET',
      requestId: 'random-request-id',
      resourceId: 'random-resource-id',
      resourcePath: '/hello',
      path: '/dev/hello',
      stage: 'dev'
    },
    resource: '/hello',
    authorizationToken: undefined,
    type: 'TOKEN'
  },
  context: {
    awsRequestId: 'cklxefdo70000qiunei52ade3',
    callbackWaitsForEmptyEventLoop: true,
    clientContext: null,
    functionName: 'serverless-express-api-gw-dev-authEndpoint',
    functionVersion: '$LATEST',
    identity: undefined,
    invokedFunctionArn: 'offline_invokedFunctionArn_for_serverless-express-api-gw-dev-authEndpoint',
    logGroupName: 'offline_logGroupName_for_serverless-express-api-gw-dev-authEndpoint',
    logStreamName: 'offline_logStreamName_for_serverless-express-api-gw-dev-authEndpoint',
    memoryLimitInMB: '1024',
    getRemainingTimeInMillis: [Function: getRemainingTimeInMillis],
    done: [Function: done],
    fail: [Function: fail],
    succeed: [Function: succeed]
  },
  log: {
    error: [Function: error],
    warn: [Function: warn],
    info: [Function: info],
    verbose: [Function: verbose],
    debug: [Function: debug]
  }
}

// NORMAL
  {
    event: {
      body: null,
      headers: {
        Host: '0.0.0.0:3003',
        'User-Agent': 'curl/7.64.1',
        Accept: '*/*'
      },
      httpMethod: 'GET',
      isBase64Encoded: false,
      multiValueHeaders: { Host: [Array], 'User-Agent': [Array], Accept: [Array] },
      multiValueQueryStringParameters: null,
      path: '/hello',
      pathParameters: null,
      queryStringParameters: null,
      requestContext: {
        accountId: 'offlineContext_accountId',
        apiId: 'offlineContext_apiId',
        authorizer: [Object],
        domainName: 'offlineContext_domainName',
        domainPrefix: 'offlineContext_domainPrefix',
        extendedRequestId: 'cklxe3ubu0000obunadrs7owx',
        httpMethod: 'GET',
        identity: [Object],
        path: '/hello',
        protocol: 'HTTP/1.1',
        requestId: 'cklxe3ubu0001obun8qkjcq2i',
        requestTime: '06/Mar/2021:15:13:08 +0800',
        requestTimeEpoch: 1615014788675,
        resourceId: 'offlineContext_resourceId',
        resourcePath: '/dev/hello',
        stage: 'dev'
      },
      resource: '/dev/hello',
      stageVariables: undefined
    },
    context: {
      awsRequestId: 'cklxe3ubw0002obunax1q97ca',
      callbackWaitsForEmptyEventLoop: true,
      clientContext: null,
      functionName: 'serverless-express-api-gw-dev-hello',
      functionVersion: '$LATEST',
      identity: undefined,
      invokedFunctionArn: 'offline_invokedFunctionArn_for_serverless-express-api-gw-dev-hello',
      logGroupName: 'offline_logGroupName_for_serverless-express-api-gw-dev-hello',
      logStreamName: 'offline_logStreamName_for_serverless-express-api-gw-dev-hello',
      memoryLimitInMB: '1024',
      getRemainingTimeInMillis: [Function: getRemainingTimeInMillis],
      done: [Function: done],
      fail: [Function: fail],
      succeed: [Function: succeed]
    },
    log: {
      error: [Function: error],
      warn: [Function: warn],
      info: [Function: info],
      verbose: [Function: verbose],
      debug: [Function: debug]
    }
  }

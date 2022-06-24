require('source-map-support/register')
const serverlessExpress = require('@vendia/serverless-express')
const app = require('./app')

exports.auth = function (event, context, callback) {
  Object.assign(event, {
    path: event.path || event.requestContext.path,
    headers: Object.assign(event.headers || {}, { authorization: event.authorizationToken }),
    httpMethod: event.httpMethod || event.requestContext.httpMethod
  })
  const handler = serverlessExpress({
    app,
    logSettings: { level: 'debug' },
    // TODO: Can't use `eventSource` override `getResponse` only, must override both `getRequest` and `getResponse`.
    // Will send a PR to the up stream to fix that.
  })
  handler(event, context, callback)
    .then((res) => {
      callback(null, JSON.parse(res.body))
    })
    .catch((err) => {
      console.error('Authentication error', err)
      callback('Unauthorized')
    })
}

exports.hello = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World from protect server',
      },
    ),
  });
}

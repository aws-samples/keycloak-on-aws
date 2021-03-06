require('source-map-support/register')
const serverlessExpress = require('@vendia/serverless-express')
const app = require('./app')

exports.auth = function (event, context, callback) {
  Object.assign(event, {
    path: event.path || event.requestContext.path,
    headers: Object.assign(event.headers || {}, { authorization: event.authorizationToken }),
    httpMethod: event.httpMethod || event.requestContext.httpMethod
  })
  const cb = (err, res) => {
    callback(err, JSON.parse(res.body))
  }
  return serverlessExpress({
    app,
    logSettings: { level: 'debug' },
    resolutionMode: 'CALLBACK', // https://stackoverflow.com/a/51139440/4108187
    // TODO: Can't use `eventSource` override `getResponse` only, must override both `getRequest` and `getResponse`.
    // Will send a PR to the up stream to fix that.
  })(event, context, cb)
}

exports.hello = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World',
      },
    ),
  });
}

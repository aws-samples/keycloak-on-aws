const express = require('express')
const Keycloak = require('keycloak-connect');
const app = express()
const keycloak = new Keycloak({}, {
  'realm': 'lambda-authorizer',
  'auth-server-url': 'http://localhost:8090/auth/',
  'ssl-required': 'external',
  'resource': 'vue',
  'public-client': true,
  'confidential-port': 0,
  'bearer-only': true, // https://www.keycloak.org/docs/latest/securing_apps/
});

app.use(keycloak.middleware())

app.all('*', keycloak.protect(), (req, res) => {
  const content = req.kauth.grant.access_token.content
  res.json({
    principalId: content.email || content.preferred_username,
    policyDocument: ALLOW_POLICY,
    context: {
      name: content.name
    },
  })
})

module.exports = app

const ALLOW_POLICY = {
  'Version': '2012-10-17',
  'Statement': [
    {
      'Sid': 'Stmt1517409086717',
      'Action': '*',
      'Effect': 'Allow',
      'Resource': '*'
    }
  ]
}

const DENY_POLICY = {
  'Version': '2012-10-17',
  'Statement': [
    {
      'Sid': 'Stmt1517409086717',
      'Action': '*',
      'Effect': 'Deny',
      'Resource': '*'
    }
  ]
}

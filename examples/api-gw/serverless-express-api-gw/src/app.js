const fs = require('fs')
const express = require('express')
const Keycloak = require('keycloak-connect')
const app = express()

const ALLOW_POLICY = jsonReadSync(`${__dirname}/../policyAllowDocument.json`)
const DENY_POLICY = jsonReadSync(`${__dirname}/../policyDenyDocument.json`)

const keycloak = new Keycloak({}, Object.assign(
  jsonReadSync(`${__dirname}/../keycloak.json`),
  {
    'bearer-only': true, // https://www.keycloak.org/docs/latest/securing_apps/
  }
))

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

function jsonReadSync(path) {
  try {
    return JSON.parse(fs.readFileSync(path))
  } catch (err) {
    console.error(err)
  }
  return {}
}

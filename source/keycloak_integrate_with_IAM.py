import boto3
import base64
import hashlib
import html
import json
import os
import re
import urllib.parse
import requests


def _b64_decode(data):
    data += '=' * (4 - len(data) % 4)
    return base64.b64decode(data).decode('utf-8')

def jwt_payload_decode(jwt):
    _, payload, _ = jwt.split('.')
    return json.loads(_b64_decode(payload))

openid_provider = "https://keycloak.ch.xiaopeiqing.com/auth/realms/iot"
client_id = "iotclient"
username = "test1"
password = "test1"
redirect_uri = "http://127.0.0.1/home/login"
client_secret="c2669e72-d858-472c"
identity_pool_id="cn-north-1:2a776105"
default_region_name="cn-north-1"
iam_openid_provider_name="keycloak.ch.test.com/auth/realms/iot"

#Why use PKCE in keycloak
'''
From: 
PKCE support with Keycloak 7.0: Keycloak 7.0 has been released on Aug 25th 2019 with PKCE support. This represents a major breakthrough for all mobile apps to increase security and to mitigate malicious attacks
Public client security vulnerability

OAuth 2.0 [RFC6749] public clients are susceptible to the authorization code interception attack.

In this attack, the attacker intercepts the authorization code returned from the authorization endpoint within a communication path not protected by Transport Layer Security (TLS), such as interapplication communication within the client’s operating system.

Once the attacker has gained access to the authorization code, it can use it to obtain the access token.
'''
#generate code_verifier
code_verifier = base64.urlsafe_b64encode(os.urandom(40)).decode('utf-8')
code_verifier = re.sub('[^a-zA-Z0-9]+', '', code_verifier)
print("==================")
print("code_verifier: %s" %code_verifier)

#generate code_challenge
code_challenge = hashlib.sha256(code_verifier.encode('utf-8')).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode('utf-8')
code_challenge = code_challenge.replace('=', '')

print("==================")
print("code_challenge: %s\n" %code_challenge)

state = "fooobarbaz"
resp = requests.get(
    url=openid_provider + "/protocol/openid-connect/auth",
    params={
        "response_type": "code",
        "client_id": client_id,
        "scope": "openid",
        "redirect_uri": redirect_uri,
        "state": state,
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
    },
    allow_redirects=False
)



cookie = resp.headers['Set-Cookie']
cookie = '; '.join(c.split(';')[0] for c in cookie.split(', '))
print("==================")
print ("cookie: %s \n"%cookie)

page = resp.text
form_action = html.unescape(re.search('<form\s+.*?\s+action="(.*?)"', page, re.DOTALL).group(1))
print("<form action> : %s\n"%form_action)


resp = requests.post(
    url=form_action, 
    data={
        "username": username,
        "password": password,
    }, 
    headers={"Cookie": cookie},
    allow_redirects=False
)


redirect = resp.headers['Location']
print("==================")
print("redirect url : %s\n"%redirect)

query = urllib.parse.urlparse(redirect).query
print("==================")
print("redirect_query : %s\n"%query)
redirect_params = urllib.parse.parse_qs(query)
print("==================")
print("redirect_params : %s\n"%redirect_params)

auth_code = redirect_params['code'][0]
print("==================")
print('auth-code: {0}\n'.format(auth_code))

resp = requests.post(
    url=openid_provider + "/protocol/openid-connect/token",
    data={
        "client_secret":client_secret,
        "grant_type": "authorization_code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "code": auth_code,
        "code_verifier": code_verifier,
    },
    allow_redirects=False
)

result = resp.json()
print("==================")
print(json.dumps(result,indent=2))

access_token=result['access_token']
print("==================")
print ("Access Token: %s\n" %access_token)

jwt=jwt_payload_decode(result['access_token'])
print("==================")
print("JWT Token Decode:")
print(json.dumps(jwt,indent=2))

id_token=result['id_token']
print("==================")
print("\nID Token: %s\n" %id_token)



cognito_idp_client = boto3.client('cognito-identity',region_name=default_region_name)
# response = cognito_idp_client.describe_identity_pool(
#     IdentityPoolId=identity_pool_id
# )

# print(json.dumps(response,indent=2))

#这里非常的关键，iam_openid_provider_name 应该是 IAM 中身份提供商中的提供商的名字
#受众应该是 keycloak releam中的 client name
custom_logins={iam_openid_provider_name : id_token}


response = cognito_idp_client.get_id(IdentityPoolId=identity_pool_id, Logins=custom_logins)
identity_id = response['IdentityId']
print("==================")
print ("\nIdentity ID: %s" %identity_id)


resp = cognito_idp_client.get_credentials_for_identity(IdentityId=identity_id,Logins=custom_logins)

secretKey = resp['Credentials']['SecretKey']
accessKey = resp['Credentials']['AccessKeyId']
sessionToken = resp['Credentials']['SessionToken']
expiration = resp['Credentials']['Expiration']
print("==================")
print ("\nSecret Key: %s"%(secretKey))
print("==================")
print ("\nAccess Key: %s"%(accessKey))
print("==================")
print ("\nSession Token: %s"%(sessionToken))
print("==================")
print ("\nExpiration: %s"%(expiration))
print("==================")


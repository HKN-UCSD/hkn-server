# HKN-Server

HKN-Server is used as the server side for the HKN-Member-Portal. 
This is where we can run APIs.

## Running Server

Type `npm run start` in your terminal.

## Common Terms in Code

{port} in the respective codes below will be the port the API is running on, specified after running `npm run start`.
You can change the port by setting it locally in your terminal. Ex: PORT=####

"token" is the temporary token a user gets when logging in.

"email" is the email for the person you want to edit claims for.

"role" is the role you would like to add to the person. The role must exist in the database.

"claims" are the claims you want to add or remove. In add-claim, it must be a dictionary = {key: value}. 
In remove-claim, it must be a list = [key, key].

## Universal code to call APIs

Usage: python script
```python
import requests
import json
// TODO: fill in based on the respective API
res.json()
```

## Add Role API

Specifically used to change a user's role by first checking some prereqs. 
To add claims unrelated to roles, change code in controllers/user.js to only 
call the addCustomerUserClaims function down below.

Usage: Universal code & insert below in TODO
```python
answer = {"token": "", "email": "", "role": ""}
res = requests.post("http://localhost:{port}/api/user/uid/add-role", json = answer)
```

## Add Claim API

Used to add custom claims to a user. 
Similar to adding a role, except it does not require anything related to documents (user, role). 
It only checks for auth.

Usage: Universal code & insert below in TODO
```python
answer = {"token": "", "email": "", "claims": "{ : , : }"}
res = requests.post("http://localhost:{port}/api/user/uid/add-claim", json = answer)
```

## Remove Claim API

Used to add remove claims from a user. 
It does not require the user to exist in document, only auth.

Usage: Universal code & insert below in TODO
```python
answer = {"token": "", "email": "", "claims": "[ , ]"}
res = requests.post("http://localhost:{port}/api/user/uid/remove-claim", json = answer)
```

## View Claim API

Used to view the user, including the custom claims. 

Usage: Universal code & insert below in TODO
```python
res = requests.post("http://localhost:{port}/api/user/uid/view-claim", {"email": ""})
```

Example output:
```
{'uid': '',
  'email': '',
  'emailVerified': True,
  'disabled': False,
  'metadata': {'lastSignInTime': 'Sat, 16 May 2020 07:06:30 GMT',
   'creationTime': 'Sat, 22 Feb 2020 23:17:14 GMT'},
  'customClaims': {'member': True, 'officer': True},
  'tokensValidAfterTime': 'Tue, 05 May 2020 21:53:46 GMT',
  'providerData': [{'uid': '', 'email': '', 'providerId': 'password'}]}
```

## Update Claim API

Used to update the user. This is slightly different than custom claims, 
as it includes emailVerified, email, etc. See the output of View Claim API. 

Usage: Universal code & insert below in TODO
```python
answer = {"token": "", "email": "", "claims": "{ : , : }"}
res = requests.post("http://localhost:{port}/api/user/uid/update-claim", json = answer)
```

## Signup API

Used to create an auth account for a whitelisted user.

Usage: Universal code & insert below in TODO
```python
answer = {"email": "", "password": "", "firstname": "", "lastname": "", "major": "", "gradYear": ""}
res = requests.post("http://localhost:{port}/api/auth/signup", json = answer)
```
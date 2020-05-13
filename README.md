# HKN-Server

HKN-Server is used as the server side for the HKN-Member-Portal. 
This is where we can run APIs.

## Running Server

Type `heroku local` in your terminal (you may need to download Heroku)

## Add Claim API

Specifically used to change a user's role by first checking some prereqs.

To add claims unrelated to roles, change code in controllers/user.js to only 
call the addCustomerUserClaims function down below.

Usage: python script
```python
import requests
res = requests.post("http://localhost:3001/api/user/uid/add-claim", {"token": "", "email": "", "role": ""})
res.json()
```
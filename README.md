# anvil-payment
URL: https://anvil-payments.herokuapp.com/api

##Paths:

####/login
Decription: To login a user using email and password
Method: POST
Header Params:
1. Content-Type: application/x-www-form-urlencoded
Body Params:
1. email
2. password

####/register
Description: Register new user
Method: POST
Header Params:
1. Content-Type: application/x-www-form-urlencoded
Body Params:
1. email
2. password
3. name
4. nameLast

####/profile
Description: Get user profile if user is logged in with valid JWT
Method: GET
Header Params:
1. Content-Type: application/x-www-form-urlencoded
2. Authorization: Bearer <JWT>

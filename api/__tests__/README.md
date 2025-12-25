### __tests__

- Directory that contains all the tests that will be ran for all endpoints

## auth.e2e.test.js

# Integration Test Auth (Sessions)


| **Unit Test**| **Description**|
|----------------|--------------------------------------------------------------------------|
|(GET /api/auth/status returns authenticated:false ) | unit test for status endpoint check if requireAuthorization works |
|(signup -> login -> status shows authenticated:true and user snapshot) | unit test for signup then login then status to show authenticated true | 
|(POST /api/auth/login returns 401 for bad password.)| unit test to test bad login |
| (logout test to destroy session.) | unit test to destroy sessions |
| (CSRF blocks POST without token) | unit test to block login without csrf token |

## product.e2e.test.js

# Integration Test Product Retrieval

| **Unit Test**| **Description**|
|-----------------|-------------------|
|GET /api/product/products | unit test for product retrieval when a visitor visits the site but is not logged in |


## customer-router.e2e.test.js

# Integration Test Customer Functionality

| **Unit Test**| **Description**|
|--------------|---------------------|
| POST Signup -> Login - > Buy item - happy path | Happy path for buying an item as a customer|
| POST Signup -> Login - > Buy item - sad path | Sad path for buying an item as a customer-incorrect token |
| POST Signup -> Login - > Buy item - sad path | Sad path for buying an item as a customer- incorrect req.params |
| GET Signup -> Login - > Buy item - > past-orders - happy path | Happy path for retrieving past orders as a customer |




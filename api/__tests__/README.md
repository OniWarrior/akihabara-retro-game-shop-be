### __tests__

- Directory that contains all the tests that will be ran for all endpoints

## auth.e2e.test.js

# Integration test Auth (Sessions)


| **Unit Test**| **Description**|
|----------------|--------------------------------------------------------------------------|
|(GET /api/auth/status returns authenticated:false ) | unit test for status endpoint check if requireAuthorization works |
|(signup -> login -> status shows authenticated:true and user snapshot) | unit test for signup then login then status to show authenticated true | 
|(POST /api/auth/login returns 401 for bad password.)| unit test to test bad login |
| (logout test to destroy session.) | unit test to destroy sessions |
| (CSRF blocks POST without token) | unit test to block login without csrf token |

## product.e2e.test.js

# Integration test Product Retrieval

| **Unit Test**| **Description**|
|-----------------|-------------------|
|GET /api/product/products | unit test for product retrieval when a visitor visits the site but is not logged in |




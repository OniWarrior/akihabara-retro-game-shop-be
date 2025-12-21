### __tests__

- Directory that contains all the tests that will be ran for all endpoints--Stubbed for right now.

## auth.e2e.test.js

# Integration test Auth (Sessions)
- (GET /api/auth/status returns authenticated:false when not logged in)
- This test will test the status endpoint that checks if a user is logged in. Returns failure 
- object when finished.
- (signup -> login -> status shows authenticated:true and user snapshot)
- This test will create a new dummy account, then logs in as the new user, then hits the status 
- endpoint to show that the user is logged in by returning an object that shows authenticated is - true.
- (POST /api/auth/login returns 401 for bad password.)
- This test will test a bad login attempt by creating a new dummy user via the signup endpoint 
- then, logging in with incorrect login credentials, then checking for the failure status code.
- (logout test to destroy session.)
- This test will test the logout endpoint by creating a dummy account via signup endpoint, 
- logging in with correct credentials, then logs the user out via the logout endpoint where 
- logging out occurs by destroying the session. Afterwards, the status endpoint is hit to verify 
- that logging out was successful.
- (CSRF blocks POST without token)
- This test will test a block on a login attempt without a CSRF token. 
- A login attempt is made without a CSRF token and it is appropriately blocked. Then a check on 
- status code is made to confirm that the correct failure status code is returned in the response.

### auth

## Overview
- directory that contains auth-middleware.js and auth-router.js
- auth-middleware.js: file that contains all middleware used for
-                   : authentication and authorization in all endpoints of project
- auth-router.js    : file that contains the /login and /signup endpoints

## Endpoints
- /signup: Endpoint that receives credentials and uses them to create a new account for user
- /login : Endpoint that uses auth-middleware functions to authenticate user creds, then
-        : logs in user.


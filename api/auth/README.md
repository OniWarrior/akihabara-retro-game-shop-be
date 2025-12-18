### auth

## Overview
- directory that contains auth-middleware.js and auth-router.js
- auth-middleware.js: file that contains all middleware used for
- authentication and authorization in all endpoints of project
- auth-router.js    : file that contains the /login and /signup endpoints

## Endpoints
- /signup: Endpoint that receives credentials and uses them to create a new account for - user.
- /login           : Endpoint that uses auth-middleware functions to authenticate user - creds,   - then
- logs in user.
- /logout          : (Session based) Logs user out of their account.
- /change-password : Endpoint that changes the current password of user with new       - password provided by the user front the frontend.
- /status          : endpoint that tests whether a session is created at login.
- A cookie is being set and subsequent request see the same req.session.user
- /me              : Endpoint that tests authorization middleware.


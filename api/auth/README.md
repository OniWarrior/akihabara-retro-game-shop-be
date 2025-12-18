### auth

## Overview
- directory that contains auth-middleware.js and auth-router.js
- auth-middleware.js: file that contains all middleware used for
- authentication and authorization in all endpoints of project
- auth-router.js    : file that contains the /login and /signup endpoints

## Endpoints

| **Request Type**| **Auth Endpoint** | **Description**|
|-----------------|-------------------|----------------|
| POST            | `/api/auth/signup`          | Creates new account               |
| POST            | `/api/auth/login`           | Logs in current user              |
| POST            | `/api/auth/logout`          | Logs out currently logged in user |
| POST            | `/api/auth/change-password` | updates password of current user  |
| GET             | `/api/auth/status`          | Tests for session creation at login |
| GET             | `/api/auth/me`              | Tests authorization middleware    |

## Middleware

|**Auth Middleware**|**Description**|
|--------------|----------------------------------------------------------------------|
| getOrCreateCSRFToken(req)    | get or create CSRF token                             |
| isSafeOrEqual(a,b)           | prevents timing attacks                              |
| requiredCSRF(req, res, next) | require valid CSRF token for state-changing methods  |
| loginLimiter                 | limits login attempts to prevent Brute force attacks |
| checkForMissingCreds(req,res,next) | checks for missing username and password       |
| validateUsername(req,res,next)   | checks if username already exists in db when creating account |
| requiredAuthorization(req,res,next) | checks session for authorization when user logs in |
| checksUsernameExists(res,req,next)  | checks if username exists when logging in     |
| validatePassword(res,req,next)      | validates password of user when logging in    |
| checkForMissingPasswords(req,res,next) | checks for missing new and confirm password |
| checkIfUserExists(req,res,next) | Checks session table, then db to confirm user exists |
| updatePassword(req,res,next)    | Performs ops that update current password of user in db |

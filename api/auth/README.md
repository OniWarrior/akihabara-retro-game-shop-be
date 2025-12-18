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



/*
 * Author: Stephen Aranda
 * File  : server.js
 * Desc  : imports all routers and loads them into express for routing to endpoints
 *       : also sets cors options and sessions config.
 */

// importing the use of env vars
require('dotenv').config();

// const for express server app
const express = require('express');

// const for helmet middleware-masks headers of client
const helmet = require('helmet');



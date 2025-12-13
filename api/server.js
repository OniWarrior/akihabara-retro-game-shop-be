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

// const for cors-config to allow only authorized front end to use api
const cors = require('cors');

// const for creating a session
const session = require('express-session');

// const for pg-simple default sessions table
const pgSimple = require('connect-pg-simple');

// const for pg- postgreSQL db
const pg = require('pg');

// create express app
const server = express();

// Heroku provides reverse proxy support (needed for secure cookies in prod)
server.set('trust proxy', 1);

// core middleware
server.use(helmet());
server.use(express.json());




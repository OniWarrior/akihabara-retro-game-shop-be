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
const connectPgSimple = require('connect-pg-simple');

// create express app
const server = express();

// Heroku provides reverse proxy support (needed for secure cookies in prod)
server.set('trust proxy', 1);

// core middleware
server.use(helmet());
server.use(express.json());

// setting cors
server.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    })
);

// postgres pool for the session store
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL || process.env.DEV_DATABASE_URL
});

// session store
const PgSession = connectPgSimple(session);

server.use(
    session({
        store: new PgSession({
            pool,
            tableName: "session",
            // pruneSessionInterval: 60 * 15, // optional: prune expired sessions every 15 min
        }),
        name: "sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production", // must be HTTPS in prod
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
    })
);

//TODO - add routers once they are completed







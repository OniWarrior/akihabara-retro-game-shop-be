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

/*
 *  allows session to be environmentally aware.
 *  production : deployed behand https and proxy. Specifically for heroku
 *  development : no https, for localhost. as the name implies, for dev
 */
const isProd = process.env.NODE_ENV === "production";

/* 
 * Heroku provides reverse proxy support (needed for secure cookies in prod).
 * Required for Express. It needs to know that the original request
 * was https when behind Heroku load balancer.
 * Without this, secure cookies may not be set.
*/
server.set('trust proxy', 1);

// core middleware
server.use(helmet());
server.use(express.json());

// setting cors
/*
 * Required for cookie based auth when front end and backend are on different
 * origins. In my case, heroku and vercel.
 * origin must be explicit, not ('*')
 * credentials must be true so cookies are sent.
 */
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





/* 
*  Session configuration (Postgres-backed)
*  Uses connect-pg-simple to store sessions in Postgres
*  so sessions survive restarts and scale across dynos.
 */
server.use(
    session({
        store: new PgSession({
            pool,
            tableName: "session", // stores sid + JSON session data
        }),

        // Cookie name (avoid default 'connect.sid')
        name: "sid",

        // Used to sign the session ID cookie
        secret: process.env.SESSION_SECRET,

        // Do not save session if nothing was added to it
        saveUninitialized: false,

        // Do not re-save session unless it changed
        resave: false,

        // Refresh session expiration on activity
        rolling: true,

        // Tell express-session we are behind a proxy
        // (important when using secure cookies on Heroku)
        proxy: isProd,

        // --------------------------------------------------
        // Cookie settings
        // --------------------------------------------------
        cookie: {
            // Prevent JavaScript access to the cookie
            // (mitigates XSS-based session theft)
            httpOnly: true,

            // Cross-site cookie behavior:
            // - "lax" works for same-site / local dev
            // - "none" is required for Vercel ↔ Heroku
            sameSite: isProd ? "none" : "lax",

            // Required when sameSite = "none"
            // Ensures cookie is only sent over HTTPS
            secure: isProd,

            // Absolute session lifetime (7 days)
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

//TODO - add routers once they are completed







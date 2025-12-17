/*
 * Author: Stephen Aranda
 * File  : auth-middleware.js
 * Desc  : file that contains all the middleware that's used for authorization and authentication
 *       : in endpoints.
* */

const User = require('./auth-model');
const BCRYPT = require('bcrypt');

// rate limit for login
const rateLimit = require('express-rate-limit');


const crypto = require('crypto');

/*
 * getOrCreateCSRFToken: create or return CSRF token stored in session
 */

const getOrCreateCSRFToken = (req) => {
    // check if you have a session
    if (!req.session) {
        return null; //return null if no session is present

    }

    // check if there's a csrf token
    if (!req.session.csrfToken) {   // convert to hex string
        // 32 bytes => 64 hex chars
        req.session.csrfToken = crypto.randomBytes(32).toString("hex");
    }

    // return token
    return req.session.csrfToken;
}

/*
 * isSafeOrEqual: constant-time comparison to avoid timing attacks 
 */

const isSafeOrEqual = (a, b) => {

    // check for string type
    if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
    }

    // create buffers for params
    const aBuffer = Buffer.from(a);
    const bBuffer = Buffer.from(b);

    // check the buffer lengths against each other
    if (aBuffer.length !== bBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(aBuffer, bBuffer);
}

/*
 * requiredCSRF: require valid CSRF token for state-changing methods
 */
const requiredCSRF = (req, res, next) => {

    // convert method to upper case
    const method = req.method.toUpperCase();

    // Safe methods do not require CSRF checks-move forward
    if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
        return next();
    }

    // must have a session
    if (!req.session) {
        // return failed response if no session is present
        return res.status(403).json({ message: "CSRF check failed (no session)" });
    }

    // expected token in session
    const expected = req.session.csrfToken;

    // provided token in header
    const provided = req.get("X-CSRF-Token"); // header name

    // compare expected and provided tokens
    if (!expected || !provided || !safeEqual(expected, provided)) {
        return res.status(403).json({ message: "CSRF token invalid or missing" });
    }

    next();


}

/*
 * loginLimiter: reduce login attempts to reduce brute force attacks
*/
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                  // 10 attempts per window per IP
    standardHeaders: true,    // adds RateLimit-* headers
    legacyHeaders: false,     // disables X-RateLimit-* headers
    message: { message: "Too many login attempts. Please try again later." },
})

/*
 * checkForMissingCreds: check if there are missing username or password for a login or signup
 */
const checkForMissingCreds = async (res, req, next) => {

    // get the username and password from the req.body
    const {
        username,
        password
    } = req.body;

    if (!username || !password ||
        username === '' || password === '') {
        return res.status(400).json({ message: 'Missing credentials' });
    }
    next();

}

/*
 * validateUsername: check if the username provided exists in db already.
 * /signup middleware
 *  */
const validateUsername = async (res, req, next) => {

    // get the username
    const { username } = req.body;

    // look in the db for the username
    const foundUsername = await User.findExistingUsername(username);

    //check if the db is successful
    if (!foundUsername) {
        // success! continue
        next();
    }
    return res.status(400).json({ message: 'username already exists!' });

}

/*
 * requiredAuth: check authorization of user by checking their session
 * /login middleware
 * */
const requiredAuthorization = async (req, res, next) => {

    // check if user has a authorized session
    if (!req.session?.user) {
        return res.status(401).json({ message: 'Not Authorized' });
    }

    // otherwise continue
    next();
}

/*
 * checkUsernameExists: check if the username exists. Used for logging in
 * /login middleware
 */
const checkUsernameExists = async (res, req, next) => {

    // get the username
    const { username } = req.body;

    // look in the db for the username
    const userCreds = await User.findExistingUsername(username);

    //check if the db is successful
    if (userCreds) {
        // success! continue
        req.userCreds = userCreds;
        next();
    }
    return res.status(400).json({ message: 'username/password does not exist' });

}

/*
 * validatePassword: validate the password with provided password
 * /login middleware
 */
const validatePassword = async (res, req, next) => {

    const { username,
        password
    } = req.body;

    // retrieve hashed password
    const userCreds = await User.findByUsername(username);

    // validate password via bcrypt
    const encryption = await BCRYPT.compare(password, userCreds.password);

    // check if db op and password validation successful
    if (userCreds && encryption) {

        next();
    }

    return res.status(400).json({ message: 'username/password does not exist' });

}



module.exports = {
    checkForMissingCreds,
    validateUsername,
    checkUsernameExists,
    requiredAuthorization,
    validatePassword,
    loginLimiter,
    getOrCreateCSRFToken,
    isSafeOrEqual,
    requiredCSRF
}
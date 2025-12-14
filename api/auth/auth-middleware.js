/*
 * Author: Stephen Aranda
 * File  : auth-middleware.js
 * Desc  : file that contains all the middleware that's used for authorization and authentication
 *       : in endpoints.
* */

const User = require('./auth-model');

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
    const foundUsername = await User.findExistingUsername(username);

    //check if the db is successful
    if (foundUsername) {
        // success! continue
        next();
    }
    return res.status(400).json({ message: 'username/password does not exist' });

}



module.exports = {
    checkForMissingCreds,
    validateUsername,
    checkUsernameExists,
    requiredAuthorization
}
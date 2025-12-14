/*
 * Author: Stephen Aranda
 * File  : auth-middleware.js
 * Desc  : file that contains all the middleware that's used for authorization and authentication
 *       : in endpoints.
* */

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
 * checkUsernameExists: check if the username provided exists in db already.
 * /signup middleware
 *  */
const checkUsernameExists = async (res, req, next) => {

    // get the username
    const { username } = req.body;

}
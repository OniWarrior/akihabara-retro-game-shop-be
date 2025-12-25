/*
 * Author : Stephen
 * File   : manager-middleware.js
 * Desc   : middleware for the manager router endpoints.js.
 */

const Manager = require('./manager-model');

// middleware to retrieve user role
const getRole = async (req, res, next) => {

    // retrieve the username
    const { username } = req.session.user;

    // get the role
    const role = await Manager.retrieveRole(username);

}
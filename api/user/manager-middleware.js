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

    // check for valid role
    switch (role) {
        case "Customer": return res.status(403).json("Role is forbidden to perform action");
        case "Manager": next(); break;
        default: return res.status(403).json("No valid role was provided to perform action");
    }

}

module.exports = { getRole }
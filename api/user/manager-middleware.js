/*
 * Author : Stephen
 * File   : manager-middleware.js
 * Desc   : middleware for the manager router endpoints.js.
 */

const Manager = require('./manager-model');

// getRole: middleware to retrieve user role
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

// checkForMissingProduct = checks for missing product information
const checkForMissingProduct = async (req, res, next) => {

    // deconstruct the req.body to retrieve sent information.
    const {
        name,
        cost,
        quantity,
        image_url,
        product_type,
        product_desc

    } = req.body;

    if (!name || name === "" ||
        !cost || cost === "" ||
        !quantity || quantity === "" ||
        !image_url || image_url === "" ||
        !product_type || product_type === "" ||
        !product_desc || product_desc === "") {
        return res.status(401).json("Missing product information!");
    }
    next();
}

module.exports = { getRole, checkForMissingProduct }
/*
 * Author: Stephen Aranda
 * File  : auth-router.js
 * Desc  : File that contains the endpoints for login and signup
 * */

const {
    requiredAuthorization,
    checkForMissingCreds,
    checkUsernameExists

} = require('./auth-middleware');

const bcrypt = require('bcrypt');
const router = require('express').Router();


/*
 * /logout: endpoint to log out a user from a session
 */
router.post('/logout', checkForMissingCreds, requiredAuthorization, async (req, res) => {
    try {

        // destroy the current session to perform logout
        req.session.destroy(() => {

            return res.status(200).clearCookie('sid').json({ message: "Logged out" });


        })

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})

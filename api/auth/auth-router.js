/*
 * Author: Stephen Aranda
 * File  : auth-router.js
 * Desc  : File that contains the endpoints for login and signup
 * */

const {
    requiredAuthorization,
    checkForMissingCreds,
    checkUsernameExists,
    loginLimiter,
    validatePassword,
    requiredCSRF

} = require('./auth-middleware');

const bcrypt = required('bcrypt');

const Auth = required('./auth-model');

const router = require('express').Router();



/*
 * (Public) /status: endpoint that tests whether a session is created at login.
 *              : A cookie is being set and subsequent request see the same req.session.user
 */
router.get('/status', async (req, res) => {

    // check for a failed retrieval
    if (!req.session?.user) {
        return res.status(400).json({ authentication: false });
    }

    // is successful, return success response
    return res.status(200).json({
        authentication: true,
        user: req.session.user
    })
})

/*
 *  /me: endpoint that tests authorization middleware
 */
router.get('/me', requiredAuthorization, async (req, res) => {
    return res.status(200).json({ user: req.session.user });
})


/*
 * /logout: endpoint to log out a user from a session
 */
router.post('/logout', checkForMissingCreds, requiredAuthorization, async (req, res) => {
    try {

        // destroy the current session to perform logout
        req.session.destroy((err) => {
            // check if logout failed
            if (err) {
                return res.status(500).json({ message: "Logout failed" });
            }

            // logout successful
            return res.status(200).clearCookie('sid').json({ message: "Logged out" });


        })

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})

/*
 * /login: logs in the user with provided credentials
 */
router.post('/login', checkForMissingCreds, requiredAuthorization, checkUsernameExists, validatePassword, loginLimiter, async (req, res) => {
    try {



        // check for session error
        req.session.regenerate((err) => {
            if (err) {
                console.error("Session regeneration error: ", err)
                return res.status(500).json({ message: 'Authentication failed' })
            }

            // set the session object
            req.session.user = {
                user_id: req.userCreds.user_id,
                username: req.userCreds.username

            }

        })

        // if this point is reached, then return success response
        return res.status(200).json({ message: 'Logged In' });


    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error ${err.message}` });
    }
})

module.exports = router;

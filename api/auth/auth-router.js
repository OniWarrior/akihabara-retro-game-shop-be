/*
 * Author: Stephen Aranda
 * File  : auth-router.js
 * Desc  : File that contains the endpoints for login and signup
 * */

const { hash } = require('bcrypt');
const {
    requiredAuthorization,
    checkForMissingCreds,
    checkUsernameExists,
    loginLimiter,
    validatePassword,
    checkForMissingPasswords,
    checkIfUserExists,
    updatePassword,
    validateUsername

} = require('./auth-middleware');



const Auth = require('./auth-model');

const router = require('express').Router();

/*
 * /change-password: endpoint that will change the password for a user.
 */
router.post('/change-password', requiredAuthorization, checkForMissingPasswords, checkIfUserExists, updatePassword, async (req, res) => {

    try {

        // Destroy current session explicitly
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    message: "Password updated, but logout failed",
                });
            }

            res.clearCookie("sid");
            return res.status(200).json({
                message: "Password updated. Please log in again.",
            });
        });

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error ${err.message}` });
    }



})

/*
 * (Public) /status: endpoint that tests whether a session is created at login.
 *              : A cookie is being set and subsequent request see the same req.session.user
 */
router.get('/status', async (req, res) => {

    // check for a failed retrieval
    if (!req.session?.user) {
        return res.status(200).json({ authentication: false });
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
router.post('/logout', requiredAuthorization, async (req, res) => {
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
router.post('/login', loginLimiter, checkForMissingCreds, checkUsernameExists, validatePassword, async (req, res) => {
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

            // if this point is reached, then return success response
            return res.status(200).json({ message: 'Logged In' });

        })




    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error ${err.message}` });
    }
})


/*
 * /signup: endpoint that facitilates the creation of a new account for a new user
 */
router.post('/signup', checkForMissingCreds, validateUsername, async (req, res) => {
    try {

        // retrieve username and password from req.body
        const {
            username,
            password
        } = req.body;

        // hash password
        const rounds = parseInt(process.env.ROUNDS);
        const hashedPassword = await hash(password, rounds);

        // create user record obj
        const userCreds = {
            username: username,
            password: hashedPassword,
            user_type: "Customer"
        }

        // Insert into the database
        const addedUser = await Auth.addUser(userCreds);

        // check if insertion succeeded
        if (addedUser) {
            //success
            return res.status(201).json({ message: `Account successfully created!` });
        }


    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }

})

module.exports = router;

/*
 * Author: Stephen Aranda
 * File  : auth-router
 * Desc  : file that contains the endpoints for login and signup
 *  */
const User = require('../users/user-model')
const {
    restricted,
    validateUsernameAndPassword,
    checkIfUsernameAlreadyRegistered,
    checkForMissingCredentials
} = requre('./auth-middleware')


const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./secrets/secret')
const router = require('express').Router()


/*
 * /login: endpoint that processes the login credentials in the req body and logs the user in.
 * */
router.post('/login', restricted, checkForMissingCredentials, validateUsernameAndPassword, async (req, res) => {

    try {
        // retrieve credentials
        const { username, password } = req.body

        // find user
        const user = await User.findByUsername(username)



        // if you have a valid user and password make the token
        if (user && encryption) {

            // make the token
            const token = makeToken(user)

            // respond with the token
            res.status(201)
                .cookie('cookie', token)
                .json({
                    message: `Welcome back ${user.username}`,
                    token: token
                })

        }
        else {
            res.status(401).json("Invalid username/password credentials")
        }





    } catch (err) {
        res.status(500).json(`Server Error: ${err.message}`)

    }
})


/*
 *  /register: endpoint that processes the credentials for registration and creates account for user.
 * */
router.post('/register', checkForMissingCredentials, checkIfUsernameAlreadyRegistered, async (req, res, next) => {
    try {

        // get user creds from body
        let user = req.body

        // convert the rounds string to int
        const rounds = parseInt(process.env.ROUNDS)

        // hash the passwords
        const hash = bcrypt.hashSync(user.password, rounds)

        // assigned hashed password to user password
        user.password = hash

        // create user object to be injected into database
        const creds = {
            username: user.username,
            password: user.password
        }

        // inject the object to db
        const addedUser = await User.addUser(creds)

        // check whether or not user was added successfully
        if (addedUser) {
            res.status(201).json({ message: `Successfully added user ${addedUser}` })
        }






    }
    catch (err) {
        res.status(500).json(`Server Error: ${err.message}`)

    }

})


// make a token for successful login
const makeToken = (credentials) => {

    // create payload
    const payload = {
        username: credentials.username,
        password: credentials.password
    }

    // state how long does token lasts
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, options)

}



module.exports = router
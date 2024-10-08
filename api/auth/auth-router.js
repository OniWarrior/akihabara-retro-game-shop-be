const User = require('../users/user-model')
const {
    restricted,
    checkIfUsernameExists,
    checkIfUsernameAlreadyRegistered,
    checkForMissingCredentials
} = requre('./auth-middleware')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./secrets/secret')
const router = require('express')


// path to login existing user
router.post('/login', checkForMissingCredentials, checkIfUsernameExists, async (req, res, next) => {

    try {
        // retrieve credentials
        const { username, password } = req.body

        // find user
        const user = await User.findByUsername(username)

        // check the password
        const encryption = bcrypt.compareSync(password, user.password)






    } catch {

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
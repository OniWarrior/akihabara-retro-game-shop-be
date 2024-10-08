const User = require('../users/user-model')
const {
    restricted,
    checkIfEmailExists,
    checkIfEmailAlreadyRegistered,
    checkForMissingCredentials
} = requre('./auth-middleware')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./secrets/secret')
const router = require('express')


// path to login existing user
router.post('/login', checkForMissingCredentials, checkIfEmailExists, async (req, res, next) => {

    try {
        // retrieve credentials
        const { email, password } = req.body

        // find user
        const user = await User.findByEmail(email)

        // check the password
        const encryption = bcrypt.compareSync(password, user.password)




    } catch {

    }
})
const { JWT_SECRET } = require('./secrets/secret')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')


//middleware-verifies that json web token is in user's header
const restricted = (req, res, next) => {
    // get the token
    const token = req.headers.authorization

    // check whether or not a token is present
    if (!token) {
        res.status(401).json("Token required")
    }
    else { // verify the present token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json("Invalid token")
            }
            else {
                req.decodedToken = decoded
                next()
            }
        })

    }

}


// middleware- checks if email exists when signing in.
const checkIfEmailExists = async (req, res, next) => {
    // get email from body
    const { email } = req.body

    // Try to find user by provided email
    const user = await User.findByEmail(email)
    if (user) {
        req.userData = user
        next()

    }
    else {
        req.status(401).json("Invalid credentials")
    }



}

// Middleware- check if email already registered when opening new account
const checkIfEmailAlreadyRegistered = async (req, res, next) => {

    // retrieve email from body
    const { email } = req.body

    // try to find the user by provided email
    const user = await User.findByEmail(email)

    if (user) {
        req.status(422).json("Email already registered")

    }
    else {
        next()
    }

}


// Middleware check if credentials are null
const checkForMissingCredentials = (req, res, next) => {
    const { email, password } = req.body

}

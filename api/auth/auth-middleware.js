/*
 * Author: Stephen Aranda
 * file  : auth-middleware.js
 * Desc  : file that contains middleware used among auth-router.
 * */
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


// middleware- checks if username exists when signing in.
const checkIfUsernameExists = async (req, res, next) => {
    // get username from body
    const { username } = req.body

    // Try to find user by provided email/username
    const user = await User.findByUsername(username)
    if (user) {
        // successfully found user-assign found user to userData
        req.userData = user
        next()

    }
    else {
        // send failure response if username doesn't exist
        req.status(401).json("Invalid credentials")
    }



}

// Middleware- check if username already registered when opening new account
const checkIfUsernameAlreadyRegistered = async (req, res, next) => {

    // retrieve username from body
    const { username } = req.body

    // try to find the user by provided username
    const user = await User.findByUsername(username)

    if (user) {
        req.status(422).json("Username already registered")

    }
    else {
        next()
    }

}


// Middleware check if credentials are null
const checkForMissingCredentials = (req, res, next) => {

    // Retrieve email and password from the body
    const { username, password } = req.body

    // check if email and password are null
    if ((!username || !password) || (username === '' || password === '')) {
        res.status(400).json("Username and Password are required")

    }
    else {
        next()
    }

}


module.exports = {
    restricted,
    checkIfUsernameExists,
    checkIfUsernameAlreadyRegistered,
    checkForMissingCredentials

}

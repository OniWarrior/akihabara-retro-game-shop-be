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
const checkIfEmailExists = (req, res, next) => {
    // get email from body
    const { email } = req.body


}
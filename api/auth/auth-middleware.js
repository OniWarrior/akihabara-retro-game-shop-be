const { JWT_SECRET } = require('./secrets/secret')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')


//middleware-verifies that json web token is in user's header
const restricted = (req, res, next) => {

}
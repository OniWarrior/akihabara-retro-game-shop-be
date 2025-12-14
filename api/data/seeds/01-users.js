/*
 * Author : Stephen Aranda 
 * File   : 01-users.js
 * Desc   : file that contains the seed information for dummy users that will be added to db.
 */

// used for hashing the password of the dummy users prior to insertion.
const bcrypt = require('bcrypt');

// import env vars
require('dotenv').config()

// dummy users
const users = [
    {
        username: 'hello_there_123',
        password: '741852963!@#',
        user_type: 'Customer'
    },
    {
        username: 'holla_back_girl_123',
        password: '789456123456',
        user_type: 'Manager'
    }
]

// iterate through array and hash passwords.
users.forEach(user => {


    // ensure rounds is not a string
    const rounds = parseInt(process.env.ROUNDS);

    // hash the passwords
    const hashedPassword = bcrypt.hashSync(user.password, rounds);

    // assigned hashed password to user password
    user.password = hashedPassword;


});
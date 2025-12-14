/*
 * Author : Stephen Aranda 
 * File   : 01-users.js
 * Desc   : file that contains the seed information for dummy users that will be added to db.
 */

const bcrypt = require('bcrypt');


const users = [
    {
        username: 'hello_there_123',
        password: '741852963!@#',
        user_type: 'Customer'
    }
]
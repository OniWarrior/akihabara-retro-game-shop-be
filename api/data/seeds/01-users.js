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
    },
    {
        username: 'holla_back_girl_123',
        password: '789456123456',
        user_type: 'Manager'
    }
]
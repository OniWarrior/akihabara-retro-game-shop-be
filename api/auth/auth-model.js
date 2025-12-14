/*
 * Author : Stephen Aranda
 * File   : auth-model.js
 * Desc   : queries that will be used for auth-router endpoints.
 */

const db = require('../data/dbConfig');



/*
 * findExistingUsername: search for existing username using username parameter
 */
const findExistingUsername = async (username) => {
    const foundUsername = await db('users')
        .select('user_id', 'username')
        .where('username', username)
        .first()
    return foundUsername
}

/*
 * findByUsername: retrieve user creds by using username
 */
const findByUsername = async (username) => {
    const foundPassword = await db('users')
        .select('password')
        .where('username', username)
        .first()
    return foundPassword
}

module.exports = {
    findExistingUsername,
    findByUsername
}
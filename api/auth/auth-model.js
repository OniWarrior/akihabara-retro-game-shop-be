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
    const username = await db('users')
        .select('username')
        .where('username', username)
        .first()
    return username
}

module.exports = {
    findExistingUsername
}
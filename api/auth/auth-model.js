/*
 * Author : Stephen Aranda
 * File   : auth-model.js
 * Desc   : queries that will be used for auth-router endpoints.
 */

const db = require('../data/dbConfig');

/*
 * revokeAllUserSessions: query that destroys all sessions of user
 */
const revokeAllUserSessions = async (userId) => {
    // session.sess is JSON; user id stored at sess.user.id
    // #>> extracts a text value at a JSON path in Postgres
    const destroyedSession = db("session")
        .whereRaw(`sess #>> '{user,user_id}' = ?`, [String(userId)])
        .del();
    return destroyedSession;
}

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

/*
 * updateUserPassword: update the password of user using username and password params
 */
const updatePassword = async (username, password) => {
    const updatedPassword = await db('users')
        .returning('username', 'password')
        .update({ password: password })
        .where('username', username)
    return updatedPassword
}

/*
 * addUser: adds a new user into the database using user param
 */
const addUser = async (user) => {
    const addedUser = await db('users')
        .insert(user)
        .returning('user_id', 'username', 'password', 'user_type')
    return addedUser
}

module.exports = {
    findExistingUsername,
    findByUsername,
    revokeAllUserSessions,
    updatePassword,
    addUser

}
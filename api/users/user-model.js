const db = require('../data/dbConfig')


// Add user to the user table
async function addUser(user) {
    const newUser = await db('User')
        .returning(['username', 'password'])
        .insert(user)
    return newUser
}


// find user by using username argument
async function findByUsername(username) {
    const found = await db('User')
        .select('username', 'password')
        .where({ username: username })
        .first()
    return found
}

module.exports = {
    addUser,
    findByUsername
}
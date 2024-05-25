const db = require('../data/dbConfig')


// Add user to the user table
async function addUser(user) {
    const newUser = await db('User')
        .returning(['username', 'password'])
        .insert(user)
    return newUser
}


// find user by using email argument
async function findByEmail(email) {
    const found = await db('User')
        .select('email', 'password')
        .where({ email: email })
        .first()
    return found
}

module.exports = {
    addUser,
    findByEmail
}
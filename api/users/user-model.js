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


// retrieve all available manga from the database
async function retrieveAvailableManga(available) {
    const availableManga = await db('Manga')
        .returning([
            'manga_id',
            'manga_name',
            'manga_price',
            'manga_desc',
            'manga_cov_img'
        ])
        .where({ isAvailable: available })
    return availableManga
}

module.exports = {
    addUser,
    findByUsername
}
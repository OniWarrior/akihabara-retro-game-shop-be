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
            'manga_cov_img',
            'manga_release_year'
        ])
        .where({ isAvailable: available })
    return availableManga
}

// retrieve all available games
async function retrieveAvailableGames(available) {
    const availableGames = await db('Games')
        .returning([
            'game_id',
            'game_name',
            'game_price',
            'game_desc',
            'game_img',
            'game_release_year'
        ])
        .where({ isAvailable: available })
    return availableGames
}


// retrieve user's bought manga
async function retrieveUserManga(username) {
    const userManga = await db('Manga')
        .select([
            'manga_id',
            'manga_name',
            'manga_desc',
            'manga_cov_img',
            'manga_release_year'
        ])
        .where({ username: username })
    return userManga
}

// retrieve user's bought games
async function retrieveUserGames(username) {
    const userGames = await db('Games')
        .select([
            'game_id',
            'game_name',
            'game_desc',
            'game_img',
            'game_release_year'
        ])
        .where({ username: username })
    return userGames
}
module.exports = {
    addUser,
    findByUsername,
    retrieveAvailableManga,
    retrieveAvailableGames,
    retrieveUserManga
}
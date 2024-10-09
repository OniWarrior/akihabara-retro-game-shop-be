const router = require('express').Router()
const {
    restricted
} = require('../auth/auth-middleware')
const User = require('./user-model')


// path to get all manga available in the shop
router.get('/get-manga', async (req, res, next) => {
    try {

        // get all available manga from the database.
        const available = true
        const manga = await User.retrieveAvailableManga(available)




    }
    catch (err) {

    }
})


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

        // send back response containing available manga
        if (manga) {
            res.status(200).json({ manga: manga })
        }
        else {
            res.status(401).json("No Manga available")
        }




    }
    catch (err) {
        res.status(500).json(`Server Error: ${err.message}`)

    }
})


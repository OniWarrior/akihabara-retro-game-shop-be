/*
 * Author : Stephen Aranda
 * File   : customer-router.js
 * Desc   : router that contains all the endpoints that is utilized by the customer user type.
 */

const router = require('express').Router();

/*
 * /buy-product: Endpoint that allows the customer to buy a specific item.
 */
router.post('/buy-product', async (req, res) => {
    try {

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


module.exports = router;
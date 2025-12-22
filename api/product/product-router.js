/*
 * Author: Stephen
 * File  : product-router.js
 * Desc  : Endpoint for product retrieval for the front end
 * 
 */
const router = require('express').Router();

/*
 * /products: Endpoint that retrieves all available products for purchase in store
 */
router('/products', async (req, res) => {
    try {

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})
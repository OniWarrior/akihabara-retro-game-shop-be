/*
 * Author: Stephen
 * File  : product-router.js
 * Desc  : Endpoint for product retrieval for the front end
 * 
 */
const router = require('express').Router();
const Products = require('./product-model');
/*
 * /products: Endpoint that retrieves all available products for purchase in store
 */
router.get('/products', async (req, res) => {
    try {

        // retrieve products
        const products = await Products.getProducts();



    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})
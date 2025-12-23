/*
 * Author : Stephen Aranda
 * File   : customer-router.js
 * Desc   : router that contains all the endpoints that is utilized by the customer user type.
 */

const router = require('express').Router();
const Product = require('../product/product-model');


/*
 * /buy-product: Endpoint that allows the customer to buy a specific item.
 */
router.post('/buy-product/:product_id', async (req, res) => {
    try {

        // get the product id
        const { product_id } = req.params;

        // get the user id
        const { user_id } = req.session.user;

        // retrieve the specific product from db
        const product = await Product.getSpecificProduct(product_id);



    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


module.exports = router;
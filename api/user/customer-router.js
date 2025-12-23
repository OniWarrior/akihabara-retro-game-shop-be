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

        // get the quantity
        const { quantity } = req.body

        // get the user id
        const { user_id } = req.session.user;

        // retrieve the specific product from db
        const product = await Product.getSpecificProduct(product_id);

        // get the current date
        const date = new Date()

        // get the day
        const day = date.getDate();

        // get the month
        const month = date.getMonth() + 1;

        // get the year
        const year = date.getFullYear()

        // format the date
        const formattedDate = `${day}` + "-" + `${month}` + "-" + `${year}`;

        // make the order object
        const order = {
            product_id: product.product_id,
            user_id: user_id,
            product_name: product.name,
            cost: product.cost,
            image_url: product.image_url,
            quantity: quantity,
            date: formattedDate
        }



    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


module.exports = router;
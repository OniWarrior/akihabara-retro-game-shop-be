/*
 * Author : Stephen Aranda
 * File   : customer-router.js
 * Desc   : router that contains all the endpoints that is utilized by the customer user type.
 */

const router = require('express').Router();
const Product = require('../product/product-model');
const Customer = require('../user/customer-model');

/*
 * /buy-product/:product_id/:quantity: Endpoint that allows the customer to buy a specific item.
 */
router.post('/buy-product/:product_id/:quantity', async (req, res) => {
    try {

        // get the product id
        const { product_id } = req.params;

        // get the quantity
        const { quantity } = req.params;

        // get the user id
        const { user_id } = req.session.user;

        // retrieve the specific product from db
        const product = await Product.getSpecificProduct(product_id);

        // get the current date
        const date = new Date();

        // make the order object
        const order = {
            product_id: Number(product_id),
            user_id: user_id,
            product_name: product.name,
            cost: Number(product.cost).toFixed(2),
            image_url: product.image_url,
            quantity: Number(quantity),
            date: date
        }

        // insert into the database
        const addedOrder = await Customer.addOrder(order);

        // check if db ops were successful
        if (product && addedOrder) {
            // success
            return res.status(201).json("Successfully purchased item!");
        }

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


/*
 * /get-past-orders: retrieve all past orders of the customer
 */
router.get('/get-past-orders', async (req, res) => {
    try {

        // get the user id of user
        const { user_id } = req.session.user;

        // get the orders
        const orders = await Customer.retrieveOrders(user_id);

        // check if retrieval is successful
        if (orders) {
            return res.status(200).json(orders);
        }

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


module.exports = router;
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

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


module.exports = router;
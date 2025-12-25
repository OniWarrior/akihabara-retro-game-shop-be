/*
 * Author : Stephen Aranda
 * File   : manager-router.js
 * Desc   : endpoints for the manager user type.
 */
const Manager = require('./manager-model');
const router = require('express').Router();
const { getRole, checkForMissingProduct } = require('./manager-middleware');

/*
 * /add-product: endpoint that allows the manager to add a product
 */

router.post('/add-product', getRole, checkForMissingProduct, async (req, res) => {
    try {

        // deconstruct the req.body to retrieve sent information.
        const {
            name,
            cost,
            quantity,
            image_url,
            product_type,
            product_desc

        } = req.body;

        // create record object for product record
        const product = {
            name: name,
            cost: cost,
            quantity: quantity,
            image_url: image_url,
            product_type: product_type,
            product_desc: product_desc
        }

        // insert into the database
        const addedProduct = await Manager.addProduct(product);

        // check if insertion is successful
        if (addedProduct) {
            // success
            return res.status(201).json({ message: `Successfully added product!` });
        }

    } catch (err) {
        // failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
})


module.exports = router;
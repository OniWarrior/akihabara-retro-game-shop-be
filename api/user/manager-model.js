/*
 * Author: Stephen Aranda
 * File  : manager-model.js
 * Desc  : Queries for the manager-router endpoints.
 */

const db = require('../data/dbConfig');

/*
 * addProduct: Adds a product to the database.
 */
const addProduct = async (product) => {
    const addedProduct = await db("products")
        .insert(product)
        .returning("product_id")
    return addedProduct
}

module.exports = addProduct;
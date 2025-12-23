/*
 * Author : Stephen Aranda
 * File   : product-model.js
 * Desc   : Queries for product-router endpoints
 */
const db = require('../data/dbConfig');


/*
 * getProducts: query to get all available products from db
 */
const getProducts = async () => {
    const products = await db('products')
        .returning([
            'product_id',
            'name',
            'cost',
            'image_url',
            'quantity',
            'product_type',
            'product_desc']
        )
        .orderBy('product_id')
    return products
}


/*
 * getSpecificProduct: query to get a specific product from db using product id as param
 */
const getSpecificProduct = async (product_id) => {

}

module.exports = {
    getProducts,
    getSpecificProduct
}
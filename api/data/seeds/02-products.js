/*
 * Author : Stephen Aranda
 * File   : 02-products.js
 * Desc   : seed file for dummy products that will be inserted into db.
 */


// insert into db
exports.seed = function (knex) {
    return knex('products').insert(products)
}
/*
 * Author : Stephen Aranda
 * File   : 02-products.js
 * Desc   : seed file for dummy products that will be inserted into db.
 */




// dummy products
const products = [
    {
        name: 'Yamcha Funko Pop',
        cost: 20.00,
        /*
         * attribution: Photo by <a href="https://unsplash.com/@scottgummerson26?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Scott Gummerson</a> on <a href="https://unsplash.com/photos/white-and-black-panda-ceramic-figurine-on-brown-wooden-table-_5Q1-ae44aw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
         */
        image_url: 'https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 5,
        product_type: 'figurine',
        product_desc: 'An amusing funko pop of Yamcha; the lamest DBZ fighter!'
    }

]

// insert into db
exports.seed = function (knex) {
    return knex('products').insert(products)
}
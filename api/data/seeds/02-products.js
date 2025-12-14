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
    },
    {
        /*
         * attribution: Photo by <a href="https://unsplash.com/@dylhunter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dylan Hunter</a> on <a href="https://unsplash.com/photos/red-and-blue-robot-holding-weapon-vSiE9-jN2wo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
         */
        name: 'RX-78 Gundam Figure',
        cost: 50.00,
        image_url: 'https://images.unsplash.com/photo-1626450429795-a3ba2964ef7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 3,
        product_type: 'figurine',
        product_desc: 'Freaking amazing Gundam figure firing BFG!'
    },
    {
        /*
         * attribution: Photo by <a href="https://unsplash.com/@caio_delarolle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">CAIO DELAROLLE</a> on <a href="https://unsplash.com/photos/one-piece-manga-volume-31-is-open-8qAHY3bXyss?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
         */
        name: 'One Piece Volume: 31',
        cost: 20.00,
        image_url: 'https://images.unsplash.com/photo-1742414304022-b38977ce1533?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 4,
        product_type: 'book',
        product_desc: "It's One Piece! Volume 31 manga in Luffy's adventure to find the One Piece!"

    },
    {
        /*
         * attribution: Photo by <a href="https://unsplash.com/@branden_skeli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Branden Skeli</a> on <a href="https://unsplash.com/photos/a-person-painting-a-picture-NIO1ZDB5kL0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
         */
        name: 'Fire Force Collection: Vol 4,7,5,16,25',
        cost: 200.00,
        image_url: 'https://images.unsplash.com/photo-1666153184660-a09d73e5b755?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 1,
        product_type: 'book',
        product_desc: 'Rare collection of little known manga - Fire Force!'
    }

]

// insert into db
exports.seed = function (knex) {
    return knex('products').insert(products)
}
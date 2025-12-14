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
    },
    {
        /*
         * attribution: https://pillowhubglobal.com/cdn/shop/files/3_8b05cc50-f111-4af4-b16c-8027d0655f84_1440x1440.png?v=1745402172
         */
        name: 'Overlord Albedo Dakimakura',
        cost: 40.00,
        image_url: 'https://pillowhubglobal.com/cdn/shop/files/3_8b05cc50-f111-4af4-b16c-8027d0655f84_1440x1440.png?v=1745402172',
        quantity: 3,
        product_type: 'pillow',
        product_desc: 'New import of Albedo version of Overlord Dakimakura! Show Albedo all your love!'
    },
    {
        /*
         * attribution:https://pillowhubglobal.com/cdn/shop/products/2b-nier-automata-body-pillow-cover-my-store-50x150-peach-skin-790121_1440x1440.jpg?v=1706832676
         */
        name: 'Nier Automata 2B Dakimakura',
        cost: 50.00,
        image_url: 'https://pillowhubglobal.com/cdn/shop/products/2b-nier-automata-body-pillow-cover-my-store-50x150-peach-skin-790121_1440x1440.jpg?v=1706832676',
        quantity: 2,
        product_type: 'pillow',
        product_desc: "Beautiful 2B Dakimakura pillow guaranteed you don't leave your gooncave! :)"
    },
    {
        /*
         * attribution:Photo by <a href="https://unsplash.com/@possessedphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Possessed Photography</a> on <a href="https://unsplash.com/photos/red-and-white-nintendo-family-computer-console-DDHNI1Y4wm8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
         */
        name: 'Japanese FAMICOM',
        cost: 200.00,
        image_url: 'https://images.unsplash.com/photo-1516111143745-fbfc2ebd6352?q=80&w=850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 1,
        product_type: 'console',
        product_desc: 'Japanese FAMICOM newly imported and complete. Comes with two Japanese games.'
    },
    {
        /*
         * attribution:Photo by <a href="https://unsplash.com/@trin_wa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">TRIN WA</a> on <a href="https://unsplash.com/photos/a-yellow-computer-on-a-table-F6J2YEy6U8A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      
         * */
        name: 'Japanese Gameboy Advance',
        cost: 300.00,
        image_url: 'https://images.unsplash.com/photo-1652197881268-d625ad54402b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 2,
        product_type: 'console',
        product_desc: 'Japanese import of Gameboy Advance! Comes with three games'
    }


]

// insert into db
exports.seed = function (knex) {
    return knex('products').insert(products)
}
/*
 * Author : Stephen Aranda
 * File   : 20251213013242_tables.js
 * Desc   : table schema for db
 * 
 */
exports.up = function (knex) {

    return knex.schema

        // table for storing session data of users
        .createTable("session", sessions => {
            sessions.string('sid').primary()
            sessions.json('sess').notNullable()
            sessions.timestamp('expire', { precision: 6 }).notNullable()
            sessions.index(["expire"], 'IDX_session_expire');
        })
        // table for users records
        .createTable('users', users => {
            users.increments('user_id').primary()
            users.string('username', 20).notNullable().unique()
            users.string('password', 40).notNullable()
            users.string('user_type', 10).notNullable()
        })
        // table for products
        .createTable('products', products => {
            products.increments('product_id').primary()
            products.string('name', 40).notNullable()
            products.decimal('cost', 10, 2).notNullable()
            products.string('image_url').notNullable()
            products.integer('quantity').notNullable() // we can have multiples of the same product-used for inventory
            products.string('product_type', 30).notNullable()
        })

        // table for orders records
        .createTable('orders', orders => {
            orders.increments('order_id').primary()
            orders.integer('product_id')
                .references('product_id')
                .inTable('products')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            orders.integer('user_id')
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            orders.string('name')
                .references('name')
                .inTable('products')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            orders.decimal('cost')
                .references('cost')
                .inTable('products')
                .inUpdate('CASCADE')
                .inDelete('CASCADE')
            orders.string('image_url')
                .references('image_url')
                .inTable('products')
                .inUpdate('CASCADE')
                .inDelete('CASCADE')
            orders.integer('quantity').notNullable()
            orders.date('date').notNullable()

        })







};


exports.down = function (knex) {

};

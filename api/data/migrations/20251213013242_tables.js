/*
 * Author : Stephen Aranda
 * File   : 20251213013242_tables.js
 * Desc   : table schema for db
 * 
 */
exports.up = function (knex) {

    return knex.schema
        .createTable('User', users => {
            users.increments('user_id').primary()
            users.string('username', 20).notNullable().unique()
            users.string('password', 40).notNullable()
        })


};


exports.down = function (knex) {

};

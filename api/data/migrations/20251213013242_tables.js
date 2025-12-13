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
        })





};


exports.down = function (knex) {

};

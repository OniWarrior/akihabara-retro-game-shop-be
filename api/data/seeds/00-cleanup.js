/*
 * Author: Stephen Aranda
 * File  : 00-cleanup.js
 * Desc  : nukes dp of all data in the event knex seed:run
 * */

// const for knex cleaner
const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return cleaner.clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock']
  })
};

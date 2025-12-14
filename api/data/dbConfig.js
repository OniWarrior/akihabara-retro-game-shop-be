/*
 * Author: Stephen Aranda
 * file  : dbConfig.js
 * Desc  : brings in env var to allow knex to connect to db in order to allow for the conversion
 *       : and execution of javascript sql queries depending on environment.
 */


// const for using knex functionality
const knex = require('knex');

// const for configuration from knex file
const config = require('../../knexfile');

// const for environment: testing, development,testing
const environment = process.env.NODE_ENV;

module.exports = knex(config[environment]);


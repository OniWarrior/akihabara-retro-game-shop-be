const knex = require('knex')
const config = require('../../knex.js')
const environment = process.env.NODE_ENV

module.exports = knex(config[environment])
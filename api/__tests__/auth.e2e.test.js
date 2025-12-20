/*
 * Author: Stephen Aranda
 * File  : auth.e2e.test.js
 * Desc  : File that contains all the test that will be conducted involving auth endpoints from
 *       : auth-router.js
 */

// import super test for integration test
const request = require("supertest");

// import Express server app
const server = require("../server");

// import the database knex instance
const db = require("../data/dbConfig"); 
/*
 * Author : Stephen Aranda
 * file   : product.e2e.test.js
 * Desc   : Integration test for testing the product-router endpoints.
 */

// import super test for integration test
const request = require("supertest");

// import Express server app
const server = require("../server.js");

// import the database knex instance
const db = require("../data/dbConfig.js");

beforeAll(async () => {

    // Ensure schema is up to date in testing db
    await db.migrate.latest();
})

beforeEach(async () => {
    // Clean tables between tests (order matters due to FK constraints if any)
    await db("session").del();
    await db("users").del();
});

afterAll(async () => {
    await db.destroy();
});


// integration test for product retrieval
describe('Product retrieval', () => {

})
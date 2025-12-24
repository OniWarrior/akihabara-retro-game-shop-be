/*
 * Author : Stephen Aranda
 * File   : customer-router.e2e.test.js
 * Desc   : test suite for the customer router
 */

// import super test for integration test
const request = require("supertest");

// import Express server app
const server = require("../server.js");

// import the database knex instance
const db = require("../data/dbConfig.js");

beforeAll(async () => {

    // Ensure schema is up to date in testing db
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    // Clean tables between tests (order matters due to FK constraints if any)
    await db("session").del();
    await db("users").del();
    await db("products").del();

});

afterAll(async () => {
    await db.destroy();
});


// retrieve any csrf using agent
async function getCsrf(agent) {
    // make get request
    const response = await agent.get('/api/auth/csrf');


    // check for status code-expects success response
    expect(response.status).toBe(200);

    // check for token type- expects string
    expect(typeof response.body.csrfToken).toBe("string");
    return response.body.csrfToken;

}


// Integration test to test all features of a Customer
describe("Customer functionality ", () => {

    test("POST Signup -> Login - > Buy item", async () => {

        // get the agent
        const agent = request.agent(server);
    })

})


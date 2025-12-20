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


// retrieve any csrf using agent
async function getCsrf(agent) {
    // make get request
    const response = await agent.get('/api/auth/csrf');

    // check for status code-expects success response
    expect(response.statusCode).toBe(200);

    // check for token type- expects string
    expect(typeof response.body.csrfToken).toBe("string");
    return response.body.csrfToken;

}

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


// Integration testing for auth endpoints
describe("Auth (sessions) ", () => {

    //  unit test for status endpoint check if requireAuthorization works
    test("GET /api/auth/status returns authenticated:false when not logged in", async () => {
        // make the request
        const response = await server.get('/api/auth/status');

        // added expected status code
        expect(response.statusCode).toBe(200);

        // expected should show authentication is false
        expect(response.body).toBe({ authenticated: false });
    })

})


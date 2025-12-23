/*
 * Author: Stephen Aranda
 * File  : product.e2e.test.js
 * Desc  : File that contains all the test that will be conducted involving auth endpoints from
 *       : product-router.js
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
    await db("products").del();
    await db.seed.run()

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


// integration test for product retrieval
describe('Product retrieval', () => {

    // unit test for product retrieval when a visitor visits the site but is not logged in
    test("GET /api/product/products", async () => {
        // get the agent
        const agent = request.agent(server);

        // 1) products (GET - will be skipped
        const csrf1 = await getCsrf(agent);

        // hit the products endpoint
        const products = await agent
            .get('/api/product/products')
            .set('X-CSRF-Token', csrf1);

        // check the status code
        expect(products.status).toBe(200);

    })

})

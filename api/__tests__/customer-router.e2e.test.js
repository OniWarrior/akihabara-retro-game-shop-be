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

        // get the csrf token
        const csrf = await getCsrf(agent);

        // create user object
        const user = { username: "Stephen", password: "Password123!", user_type: "Customer" };

        // hit signup endpoint to create account
        const signup = await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf)
            .set("Content-Type", "application/json")
            .send(user);

        // check the success code after completion
        expect(signup.status).toBe(201);

        // verify correct insertion of user into db.
        const userRow = await db("users")
            .where("username", user.username)
            .first();

        // check if the user row was retrieved
        expect(userRow).toBeTruthy();

        // check if the password was hashed
        expect(userRow.password).not.toBe(user.password);

        // Now continue to login----
        // get a csrf token for the login
        const csrf2 = getCsrf(agent);

        // hit the login endpoint
        const login = await agent
            .post('/api/auth/login')
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send({ username: user.username, password: user.password });

        // check the status code
        expect(login.status).toBe(200);

        // status should now be authenticated
        const status = await agent.get("/api/auth/status");


    })

})


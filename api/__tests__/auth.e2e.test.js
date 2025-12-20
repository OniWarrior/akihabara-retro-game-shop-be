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

    // unit test for signup then login then status to show authenticated true
    test("signup -> login -> status shows authenticated:true and user snapshot", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        // hit the signup endpoint, set csrf token
        const signup = await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf1)
            .send({ username: "stephen", password: "Password123!", user_type: "user" });

        // expect 200, 201 status code on signup completion
        expect([200, 201]).toContain(signup.statusCode);

        // Verify user inserted and password hashed (not plaintext)
        const userRow = await db("users").where({ username: "stephen" }).first();
        expect(userRow).toBeTruthy();
        expect(userRow.password).not.toBe("Password123!");

        // 2) Login (POST also needs CSRF)
        const csrf2 = await getCsrf(agent);

        // hit the login endpoint and set teh csrf token
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf2)
            .send({ username: "stephen", password: "Password123!" });

        // expect status code to be 200 after success response
        expect(login.statusCode).toBe(200);

        // 3) Status should now show authenticated
        const status = await agent.get("/api/auth/status");
        expect(status.statusCode).toBe(200);
        expect(status.body.authenticated).toBe(true);

        // Your session.user shape might be {user_id, username, user_type}
        expect(status.body.user.username).toBe("stephen");
    });

    // unit test to test bad login
    test('POST /api/auth/login returns 401 for bad password', async () => {

        // get the test agent
        const agent = request.agent(server);

        // insert a user directly
        const csrf = await getCsrf(agent);

        // hit the signup endpoint
        await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf)
            .send({ username: "stephen", password: "Password123!", user_type: "user" });

        // get the new csrf
        const csrf2 = await getCsrf(agent);

        // hit login
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf2)
            .send({ username: "stephen", password: "WRONG" });

        // check the status code-see if failed
        expect(login.statusCode).toBe(401);
    })

    // unit test to destroy sessions
    test('logout test to destroy session', async () => {

        // get test agent
        const agent = request.agent(server);
    })

})


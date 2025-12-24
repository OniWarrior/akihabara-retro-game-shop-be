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
const { get } = require("../api-router.js");

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
    await db("orders").del();
    await db.seed.run();

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

    // happy path for buying an item as a customer
    test("POST Signup -> Login - > Buy item - happy path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Customer" }
        // hit the signup endpoint, set csrf token
        const signup = await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf1)
            .set('Content-Type', 'application/json')
            .send(user);



        // expect  201 status code on signup completion
        expect(signup.status).toBe(201);

        // Verify user inserted and password hashed (not plaintext)
        const userRow = await db("users").where({ username: "stephen" }).first();
        expect(userRow).toBeTruthy();
        expect(userRow.password).not.toBe("Password123!");

        // 2) Login (POST also needs CSRF)
        const csrf2 = await getCsrf(agent);

        const log = { username: "stephen", password: "Password123!" }

        // hit the login endpoint and set teh csrf token
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(log);



        // expect status code to be 200 after success response
        expect(login.status).toBe(200);

        // 3) Status should now show authenticated
        const status = await agent.get("/api/auth/status");

        expect(status.status).toBe(200);
        expect(status.body.authenticated).toBe(true);

        // Your session.user shape might be {user_id, username, user_type}
        expect(status.body.user.username).toBe("stephen");



        const product_id = 1;
        const quantity = 1;

        const csrf3 = await getCsrf(agent);

        // now attempt to buy an item
        const buyItem = await agent
            .post(`/api/user/buy-product/${product_id}/${quantity}`)
            .set("X-CSRF-Token", csrf3)
            .set('Content-Type', 'application/json')


        // check status
        expect(buyItem.status).toBe(201);



    })

    // sad path for buying an item as a customer-incorrect token
    test("POST Signup -> Login - > Buy item - sad path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Customer" }
        // hit the signup endpoint, set csrf token
        const signup = await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf1)
            .set('Content-Type', 'application/json')
            .send(user);



        // expect  201 status code on signup completion
        expect(signup.status).toBe(201);

        // Verify user inserted and password hashed (not plaintext)
        const userRow = await db("users").where({ username: "stephen" }).first();
        expect(userRow).toBeTruthy();
        expect(userRow.password).not.toBe("Password123!");

        // 2) Login (POST also needs CSRF)
        const csrf2 = await getCsrf(agent);

        const log = { username: "stephen", password: "Password123!" }

        // hit the login endpoint and set teh csrf token
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(log);



        // expect status code to be 200 after success response
        expect(login.status).toBe(200);

        // 3) Status should now show authenticated
        const status = await agent.get("/api/auth/status");

        expect(status.status).toBe(200);
        expect(status.body.authenticated).toBe(true);

        // Your session.user shape might be {user_id, username, user_type}
        expect(status.body.user.username).toBe("stephen");



        const product_id = 1;
        const quantity = 1;



        // now attempt to buy an item
        const buyItem = await agent
            .post(`/api/user/buy-product/${product_id}/${quantity}`)
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')


        // check status
        expect(buyItem.status).toBe(403);



    })

    // sad path for buying an item as a customer- incorrect req.params
    test("POST Signup -> Login - > Buy item - sad path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Customer" }
        // hit the signup endpoint, set csrf token
        const signup = await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf1)
            .set('Content-Type', 'application/json')
            .send(user);



        // expect  201 status code on signup completion
        expect(signup.status).toBe(201);

        // Verify user inserted and password hashed (not plaintext)
        const userRow = await db("users").where({ username: "stephen" }).first();
        expect(userRow).toBeTruthy();
        expect(userRow.password).not.toBe("Password123!");

        // 2) Login (POST also needs CSRF)
        const csrf2 = await getCsrf(agent);

        const log = { username: "stephen", password: "Password123!" }

        // hit the login endpoint and set teh csrf token
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(log);



        // expect status code to be 200 after success response
        expect(login.status).toBe(200);

        // 3) Status should now show authenticated
        const status = await agent.get("/api/auth/status");

        expect(status.status).toBe(200);
        expect(status.body.authenticated).toBe(true);

        // Your session.user shape might be {user_id, username, user_type}
        expect(status.body.user.username).toBe("stephen");



        const product_id = -1;
        const quantity = -1;

        const csrf3 = await getCsrf(agent)

        // now attempt to buy an item
        const buyItem = await agent
            .post(`/api/user/buy-product/${product_id}/${quantity}`)
            .set("X-CSRF-Token", csrf3)
            .set('Content-Type', 'application/json')


        // check status
        expect(buyItem.status).toBe(500);



    })


    // happy path for retrieving past orders as a customer
    test("GET Signup -> Login - > Buy item - > past-orders - happy path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Customer" }
        // hit the signup endpoint, set csrf token
        const signup = await agent
            .post("/api/auth/signup")
            .set("X-CSRF-Token", csrf1)
            .set('Content-Type', 'application/json')
            .send(user);



        // expect  201 status code on signup completion
        expect(signup.status).toBe(201);

        // Verify user inserted and password hashed (not plaintext)
        const userRow = await db("users").where({ username: "stephen" }).first();
        expect(userRow).toBeTruthy();
        expect(userRow.password).not.toBe("Password123!");

        // 2) Login (POST also needs CSRF)
        const csrf2 = await getCsrf(agent);

        const log = { username: "stephen", password: "Password123!" }

        // hit the login endpoint and set teh csrf token
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(log);



        // expect status code to be 200 after success response
        expect(login.status).toBe(200);

        // 3) Status should now show authenticated
        const status = await agent.get("/api/auth/status");

        expect(status.status).toBe(200);
        expect(status.body.authenticated).toBe(true);

        // Your session.user shape might be {user_id, username, user_type}
        expect(status.body.user.username).toBe("stephen");



        const product_id = 1;
        const quantity = 1;

        const csrf3 = await getCsrf(agent);

        // now attempt to buy an item
        const buyItem = await agent
            .post(`/api/user/buy-product/${product_id}/${quantity}`)
            .set("X-CSRF-Token", csrf3)
            .set('Content-Type', 'application/json')


        // check status
        expect(buyItem.status).toBe(201);

        const pastOrders = await agent
            .get('/api/user/get-past-orders')
            .set("Content-Type", "application/json")

        expect(pastOrders.status).toBe(200)



    })





})


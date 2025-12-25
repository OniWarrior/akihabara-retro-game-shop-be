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

// Integration test to test all features of a Manager
describe("Manager functionality ", () => {

    // happy path for buying an item as a manager
    test("POST  Login - > Add product - happy path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Login (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);


        const log = { username: 'holla_back_girl_123', password: '789456123456' }

        // hit the login endpoint and set teh csrf token
        const login = await agent
            .post("/api/auth/login")
            .set("X-CSRF-Token", csrf1)
            .set('Content-Type', 'application/json')
            .send(log);



        // expect status code to be 200 after success response
        expect(login.status).toBe(200);

        // 3) Status should now show authenticated
        const status = await agent.get("/api/auth/status");

        expect(status.status).toBe(200);
        expect(status.body.authenticated).toBe(true);

        // Your session.user shape might be {user_id, username, user_type}
        expect(status.body.user.username).toBe("holla_back_girl_123");

        const csrf3 = await getCsrf(agent);

        const product = {
            name: "Funko pop",
            cost: 21.00,
            quantity: 1,
            image_url: 'https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            product_type: "figurine",
            product_desc: 'An amusing funko pop of Yamcha; the lamest DBZ fighter!'
        }

        // now attempt to add an item
        const addItem = await agent
            .post(`/api/user/add-product`)
            .set("X-CSRF-Token", csrf3)
            .set('Content-Type', 'application/json')
            .send(product)


        // check status
        expect(addItem.status).toBe(201);



    })

    // sad path for adding an item as a manager-incorrect token
    test("POST Signup -> Login - > Add Product - sad path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Manager" }
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



        const product = {
            name: "Funko pop",
            cost: 21.00,
            quantity: 1,
            image_url: 'https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            product_type: "figurine",
            product_desc: 'An amusing funko pop of Yamcha; the lamest DBZ fighter!'
        }

        // now attempt to add an item
        const addItem = await agent
            .post(`/api/user/add-product`)
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(product)


        // check status
        expect(addItem.status).toBe(403);



    })

    // sad path for adding an item as a manager-invalid role Customer
    test("POST Signup -> Login - > Add Product - sad path", async () => {

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



        const product = {
            name: "Funko pop",
            cost: 21.00,
            quantity: 1,
            image_url: 'https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            product_type: "figurine",
            product_desc: 'An amusing funko pop of Yamcha; the lamest DBZ fighter!'
        }

        // now attempt to add an item
        const addItem = await agent
            .post(`/api/user/add-product`)
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(product)


        // check status
        expect(addItem.status).toBe(403);



    })

    // sad path for adding an item as a manager-invalid role neither Customer or Manager
    test("POST Signup -> Login - > Add Product - sad path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Nuke" }
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



        const product = {
            name: "Funko pop",
            cost: 21.00,
            quantity: 1,
            image_url: 'https://images.unsplash.com/photo-1627672360124-4ed09583e14c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            product_type: "figurine",
            product_desc: 'An amusing funko pop of Yamcha; the lamest DBZ fighter!'
        }

        // now attempt to add an item
        const addItem = await agent
            .post(`/api/user/add-product`)
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')
            .send(product)


        // check status
        expect(addItem.status).toBe(403);

    })

    // sad path for adding an item as a manager-missing product
    test("POST Signup -> Login - > Add Product - sad path", async () => {

        // get the agent
        const agent = request.agent(server);

        // 1) Signup (POST needs CSRF because you mounted requiredCSRF on /api)
        const csrf1 = await getCsrf(agent);

        const user = { username: "stephen", password: "Password123!", user_type: "Nuke" }
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





        // now attempt to add an item
        const addItem = await agent
            .post(`/api/user/add-product`)
            .set("X-CSRF-Token", csrf2)
            .set('Content-Type', 'application/json')



        // check status
        expect(addItem.status).toBe(403);

    })

})


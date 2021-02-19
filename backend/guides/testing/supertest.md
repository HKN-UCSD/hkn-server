# Supertest

[SuperTest](https://github.com/visionmedia/supertest) is used to help with simplifying testing out HTTP requests on endpoints of the backend server. Currently, we are using SuperTest to do end-to-end testing for the server.

For our use case in **src/tests/EventController.test.ts**, we needed request() from SuperTest which takes in an Express app as the parameter, so the app instantiation/initialization logic has to be abstracted from **src/index.ts** into **src/app.ts** so `EventController.test.ts` can use the Express app instance as well, not just **src/index.ts**.

Note that since getExpressApp() in **src/app.ts** gives both the Express app and the DB connection, whenever you need to use SuperTest, remember to close the connection after all tests are run.

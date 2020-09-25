# HKN Server

## Deploys

- `Production`: https://api.hknucsd.com/
- `Development`: https://dev-api.hknucsd.com/

**tl;dr**

```
npm run start
```

## Commands

- `npm run start`: runs lint, clean, build, then serves on localhost with hot reloading (updates server everytime you change code.)
- `npm run build`: runs ts -> js transpiler (tsc)
- `npm run clean`: rm -rf dist/\* but has cross-env support
- `npm run typeorm`: runs typeorm cli (npx typeorm doesn't work because typeorm doesn't play well with typescript)
- `npm run typeorm:sync`: sync your entities with the postgres db to update database schema
- `npm run postgres:start`: Stops the current postgres container if there is one currently running and starts up a new postgres container.
- `npm run postgres:stop`: Stops the current postgres container if there is one currently running.
- `npm run localpg:start`: Starts up the local postgres docker container, then runs TypeORM's database migration and seeding

## Dependency Injection(DI)

DI is essentially passing in your dependencies as arguments in your constructor. See [this](https://www.sarulabs.com/post/2/2018-06-12/what-is-a-dependency-injection-container-and-why-use-one.html) for further explanation.

Currently in our codebase, for any class that needs DI, we export both the class and an instance of that class, with all the dependencies
passed into the constructor arguments, where the dependencies are also an instance of their respective class.

Examples:

In **src/controllers/UserController.ts**, we need AppUserService and AppUserMapper, so UserController's constructor has two arguments
for that. So, we imported AppUserService/Mapper class and their respective instance (denoted as AppUserServiceImpl and AppUserMapperImpl)
as dependencies to create an instance of UserController (denoted as UserControllerImpl). The result is an instance of the UserController
class:

- `export const UserControllerImpl = new UserController(AppUserServiceImpl, AppUserMapperImpl);`

In **src/services/AppUserService.ts**, we do not need any other dependency for the Service class to work properly, so we can just export
an instance of AppUserService class without needing to import any dependency:

- `export const AppUserServiceImpl = new AppUserService();`

## Directory Structure + Terms

All TypeScript code should be located inside of src for the tsc compiler to pick up the changes. For development hot reloading, we use tsc-watch to do incremental compilation and server rebooting. For further instructions on adding any of the following, _please_ read the corresponding guide in guides/

### index.ts

Entry point of server that delegates to _app.ts_ for initializing and setting up the backend server.

### app.ts

Responsible for applying middlewares onto the server (Express app), running [loaders](https://softwareontheroad.com/ideal-nodejs-project-structure/) to establish resources used in the code, connecting to controllers set up using [routing-controllers](https://github.com/typestack/routing-controllers) and establish any remaining routers separate from controllers.

### config.ts

All environment variables should be loaded here and encapsulated within the global singleton Config object so we don't leak process.envs everywhere.

### Entities

We use [TypeORM](https://github.com/typeorm/typeorm) to manage our tables in our Postgres database. The term _entities_ is directly borrowed from TypeORM's definition of an entity. Each file within the Entities folder should directly correspond to a Postgres table or view. Enums used within a table should be declared in the same file of the table that it is used in.

Note that we use the Data Mapper pattern over the Active Record pattern because it offers better decoupling between the data model and our data manipulation logic. (Read more [here](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)) As a result, entities should merely be **a Typescript type without any attached methods**. Entities are currently implemented as classes merely to conform to TypeORM's decorators, as it is impossible to decorate interface/type properties.

Under this pattern, business logic is encapsulated within Services that delegate to Repositories which manage data persistence (a.k.a. talking to Postgres).

### Controllers

A controller is a class containing logic corresponding to a subset of API routes. We use Express as our base framework of choice, but use [routing-controllers](https://github.com/typestack/routing-controllers) for controller development. **routing-controllers** allow developers to rapidly develop logic without having to worry about directly manipulating request/response objects.

Each method within a controller corresponds to an API endpoint. Note that the response type of each controller method must be manually annotated with @ResponseSchema for swagger docs generation.

Returning _undefined_ from a controller method will automatically generate a 404 error.

Controllers should be "skinny", meaning that all they do is validate req/res (auto handled by class-validator).

This means that controllers mainly delegate to mappers for mapping req/res payloads to entities, then pass on those entities to service classes that perform the business logic.

### Payloads

A payload is a class corresponding to either a request or a response object corresponding to the bodies of POST/PUT/PATCH requests, or the responses of a general HTTP request. They exist for multiple reasons:

- Reuse between frontend and backend
- Auto docs generation
- Auto request/response validation by [class-validator](https://github.com/typestack/class-validator)

Again, these things should be interfaces (since they're used similar to C style structs) but are implemented as classes to support [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html). They should not have methods defined on them.

### Services

A service encapsulates business logic either pertaining to a db entity, or a group of actions (a.k.a sending emails through sendgrid or fetching+saving resumes). See guides/add_new_service.md for more details.

### Middlewares

We use custom [middlewares](https://expressjs.com/en/guide/using-middleware.html) (which are functions) to process information in a certain way and/or for a certain purpose in a sequence of functions/middlewares when making an HTTP request to an endpoint.

Examples:

In our codebase, the most prominent use case we have for middlewares so far is role-based access control (RBAC). This allows us to assign and enforce access rights to endpoints based on a user's role, giving users with permitted roles access to an endpoint (or at least access to a type of HTTP request on an endpoint) and denying access to those without. We have five auth middlewares for the five roles that we use in
our system, created via the factory pattern.

- `AdminAuthMiddleware`: Gives access only to users with admin role.
- `OfficerAuthMiddleware`: Gives access only to users with admin/officer role.
- `MemberAuthMiddleware`: Gives access only to users with admin/officer/member role.
- `InducteeAuthMiddleware`: Gives access only to users with admin/officer/member/inductee role.
- `GuestAuthMiddleware` or no auth middleware: Gives access to all roles.

Check out **src/middlewares/auth** to see how they are implemented and **src/controllers** to see how they are used.

### Mappers

A mapper is responsible for mapping request payloads to entities, and entities to response payloads.

## Docs Generation

API documentation is autogenerated and served at the /api/docs endpoint. The documentation is autogenerated via [class-validator-jsonschema](https://github.com/epiphone/class-validator-jsonschema) and [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi). These libraries grab metadata from the routing-controllers and class-validator libraries to generate OpenAPI specs, which we then serve using [redoc-express](https://www.npmjs.com/package/redoc-express).

The OpenAPI spec is served as a json file at the /api/docs/json endpoint (should probably be /api/docs?json=true but oh well). **You can import this into Postman to generate a collection.**

### Migrations

A db migration encapsulates a change to the database schema. Migration files are stored in **src/migrations**. Please visit [TypeORM's page](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md) on migrations to learn more about them and how to write a migration file. This is part of the 3-step process we have for local testing (_npm run localpg:start_) that guarantees idempotence of tests (when starting
up the postgres container, we will always have the same testing data).

### Seeds

Seeding a DB means providing initial data to a DB when the DB is set up initially. Seed files are stored in **src/seeds**. We currently use
this to populate a DB with initial data after a migration. This is also part of the 3-step process we have for local testing (_npm run localpg:start_) that guarantees idempotence of tests.

### Tests

Ignore for now - don't think mocking is worth the effort. Future ideas include standing up a Docker container with a Postgres db running on localhost and pointing tests at that instead. Or run sqlite in memory.

# HKN Server

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

## Dependency Injection(DI)

DI is essentially passing in your dependencies as arguments in your constructor. See [this](https://www.sarulabs.com/post/2/2018-06-12/what-is-a-dependency-injection-container-and-why-use-one.html) for further explanation.

In this project, unlike in the above article, we use [tsyringe](https://github.com/microsoft/tsyringe) as our DI framework of choice. While [TypeDI](https://github.com/typestack/typedi) plays better with the typestack ecosystem (routing-controllers, typeorm etc.), TypeDI does not have strong support for dependency resolution when registering named services. (For more details @godwinpang)

We use DI to inject our controllers and our services by decorating those classes with the @injectable decorator. Note that we skip injecting repositories not because it is the right thing to do, but tsyringe has no good way of injecting generic type repositories.

## Directory Structure + Terms

All typescript code should be located inside of src for the tsc compiler to pick up the changes. For development hot reloading, we use tsc-watch to do incremental compilation and server rebooting. For further instructions on adding any of the following, _please_ read the corresponding guide in guides/

### index.ts

Entry point of server that delegates to loaders (in Loaders folder). Loader pattern is still WIP - see https://softwareontheroad.com/ideal-nodejs-project-structure/ for more details.

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

### Mappers

A mapper is responsible for mapping request payloads to entities, and entities to response payloads.

## Docs Generation

API documentation is autogenerated and served at the /api/docs endpoint. The documentation is autogenerated via [class-validator-jsonschema](https://github.com/epiphone/class-validator-jsonschema) and [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi). These libraries grab metadata from the routing-controllers and class-validator libraries to generate OpenAPI specs, which we then serve using [redoc-express](https://www.npmjs.com/package/redoc-express).

The OpenAPI spec is served as a json file at the /api/docs/json endpoint (should probably be /api/docs?json=true but oh well). **You can import this into Postman to generate a collection.**

### Migrations

A db migration encapsulates a change to the database schema. We'll set this up when we need to, but it allows us to do schema rollbacks and modifications.

### Tests

Ignore for now - don't think mocking is worth the effort. Future ideas include standing up a Docker container with a Postgres db running on localhost and pointing tests at that instead. Or run sqlite in memory.

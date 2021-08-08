# Structure Of The Backend Codebase (starting from ./src):

## Entities

- We use [TypeORM](https://github.com/typeorm/typeorm) to manage our tables in our Postgres database. The term _entities_ is directly borrowed from TypeORM's definition of an entity. Each file within the Entities folder should directly correspond to a Postgres table or view. Enums used within a table should be declared in the same file of the table that it is used in.
- One can think of Entities as blueprints for constructing rows of the corresponding table in our Postgres database. Entities outline what fields each row of the corresponding table can/must have. In other words, it defines how many columns the table has and the type + content of each column.
- Note that we use the Data Mapper pattern over the Active Record pattern because it offers better decoupling between the data model and our data manipulation logic. (Read more [here](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)) As a result, entities should merely be **a Typescript type without any attached methods**. Entities are currently implemented as classes merely to conform to TypeORM's decorators, as it is impossible to decorate interface/type properties.
- Under this pattern, business logic is encapsulated within Services that delegate to Repositories which manage data persistence (a.k.a. talking to Postgres).

## Controllers

- A controller is a class containing logic corresponding to a subset of API routes. We use Express as our base framework of choice, but use [routing-controllers](https://github.com/typestack/routing-controllers) for controller development. **routing-controllers** allow developers to rapidly develop logic without having to worry about directly manipulating request/response (req/res) objects.
- A controller gives the backend server the ability to receive HTTP requests to a set of API routes with common prefixes such as `/api/events`, `/api/users`, etc. (more examples in `src/controllers`), carry out a set of actions based on that request, and send back an HTTP response to the requester.
- Each method within a controller corresponds to an API endpoint. Each of these methods are endpoint handlers, which means they handle whatever needs to happen after an HTTP request has been made to their associatied API endpoint. Note that the response type of each controller method must be manually annotated with @ResponseSchema for swagger docs generation.
- Returning `undefined` from a controller method will automatically generate a 404 error.
- Controllers should be "skinny", meaning that all they do is validate req/res (auto handled by class-validator).
- This means that controllers mainly delegate to mappers for mapping req/res payloads to entities, then pass on those entities to service classes that perform the business logic.

## Payloads

- A payload is a class corresponding to either a request or a response object corresponding to the bodies of POST/PUT/PATCH requests, or the responses of a general HTTP request. They exist for multiple reasons:
  - Reuse between frontend and backend
  - Auto docs generation (check out our production API's [docs](https://api.hknucsd.com/api/docs))
  - Auto request/response validation by [class-validator](https://github.com/typestack/class-validator)
- Again, these things should be interfaces (since they're used similar to C style structs) but are implemented as classes to support [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html). They should not have methods defined on them.

## Services

- A service encapsulates business logic either pertaining to a database entity, or a group of actions (a.k.a sending emails through sendgrid or fetching+saving resumes) that involves processing/manipulating data received, interacting with the database, etc.
- Services are mostly used by Controllers and Mappers to carry out some business logic that they need for their respective endpoint handlers and mapper methods. Services can also use other services that it needs to carry out their tasks. Here is an example of [that](../../src/services/EventService.ts).
- See [this](../add/add_new_service.md) for more details on services and how to add new services to our backend.

## Middlewares

- Check out [this](./guides/middlewares/index.md) doucumentation on middlewares for more information about middlewares and how we use them. Also check out `src/middlewares` if you want to see how they are implemented and `src/controllers` if you want to see how they are used.

## Mappers

- A mapper is responsible for mapping request payloads to entities (if applicable), and entities to response payloads.
- This is what we use to avoid having to convert request payloads to entities and entities to response payloads manually in endpoint handlers in Controllers. Since Controllers should not have to worry about that, we delegate that conversion task to Mappers.
- Usually, mapper methods for converting request payloads to entities are used to obtain a new or updated entity based on the information passed into the request payload in order to save this new/updated entity to the database. However, one should use them wherever applicable.
- Mapper methods for converting entities to response payloads are used to make sure what we are sending back as a response that involves an entity matches with what the response payload is supposed to look like.

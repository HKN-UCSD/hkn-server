# Adding a New Controller

A controller refers to a class representing a group of routes belonging to a common endpoint. In this project, we strive to have 'skinny controllers' where controllers mainly manipulate request/response formatting and delegate to services for the heavy lifting. Mapping request/responses should be delegated to mappers.

Naming convention for paths should be plural, a.k.a. preferring `/api/events` over `/api/event`.

To create a new controller, follow the following steps.

### 1. Decorators

Mark the class as injectable with @singleton(). Note that we don't use DI tokens with controllers as there is no need(fingers-crossed) to dynamically swap controller behavior at runtime.

Mark the class with @JsonController('base_endpoint').

### 2. Setup injection

We choose to use constructor style injection with instance variable declared first, followed by explicit injection in the constructor.

### 3. Setup routes

Each route should have at least 2 decorators.

- @SomeHTTPMethod('endpoint')
- @ResponseSchema(T)

The HTTPMethod endpoint is in addition to the previously mentioned base_endpoint. The response schema decorator is needed for docs generation. I defer routing-controllers specific decorators (@Param, @Body etc.) to be described by the [docs](https://github.com/typestack/routing-controllers).

### 4. Setup payloads

Each response/request object should conform to a class decorated by class-validator as defined in src/payloads. This is for request/response validation and also future code reuse with frontend.

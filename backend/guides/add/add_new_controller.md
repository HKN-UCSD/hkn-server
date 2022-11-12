# Adding a New Controller

A controller refers to a class representing a group of routes belonging to a common endpoint. In this project, we strive to have 'skinny controllers' where controllers mainly manipulate request/response formatting and delegate to services for the heavy lifting. Mapping request/responses should be delegated to mappers.

Naming convention for paths should be plural, a.k.a. preferring `/api/events` over `/api/event`.

To create a new controller, follow the following steps.

### 1. Class Decorators

Mark the class with @JsonController('base_endpoint').

### 2. Setup constructor

Constructors are to be made in this manner:

- `constructor(private yService: YService, private zMapper: ZMapper) {}` where YService is a service class and ZMapper is a mapper class that your controller depends on and yService and zMapper is an instance of their respective class. Here is a [reference](https://kendaleiv.com/typescript-constructor-assignment-public-and-private-keywords/) to this syntax.

### 3. Setup routes

Each route should have at least 2 decorators.

- @SomeHTTPMethod('endpoint')
- @ResponseSchema(T)

The HTTPMethod endpoint is in addition to the previously mentioned base_endpoint. The response schema decorator is needed for docs generation. I defer routing-controllers specific decorators (@Param, @Body etc.) to be described by the [docs](https://github.com/typestack/routing-controllers).

### 4. Setup payloads

Each response/request object should conform to a class decorated by class-validator as defined in src/payloads. This is for request/response validation and also future code reuse with frontend.

### 5. Setup export statement

Make an export statement that exports an instance of your controller class. Remember to import the instances of service and mapper
classes that you use so you can pass it into the constructor call of you controller class. An example of this is:

- `export const XControllerImpl = new XController(YServiceImpl, ZMapperImpl);` where "Impl" stands for "Implementation".

### 6. Include controller in top-level index file of controllers folder

In ./src/controllers/index, add `export {XController, XControllerImpl} from './XController'` and `controllerMap.set(XController.name, XControllerImpl);`.

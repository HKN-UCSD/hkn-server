# Adding a New Service

As mentioned in the README, a service encapsulates business logic pertaining to either entities or actions. The functions of a service should take in entities or some non payload config. The service class should be stateless, and should exist to group together a group of related functions.

For example, we might have an endpoint that promotes an event's status from 'pending' to 'active'. An event must satisfy some criteria to be promoted. In this case, we can add a `changeStatus` method to the EventService class that delegates to a `canPromoteStatus` method.

We use DI to dynamically swap out services such as Email/S3 buckets for local development purposes.

To create a new service, follow the following steps.

### 1. Implement service

1. Create file called XService.ts in `src/services` extending the previously declared interface. Remember to annotate/decorate your class with @singleton!
2. Export service from `src/services/index.ts`

To create a service that dynamically changes at runtime (i.e. email/s3), follow the following steps.

### 1. Add interface

1. Create your interface definition in `src/services/interfaces`.
2. Add documentation in [jsdoc](https://jsdoc.app/) style. Pro tip: if you're using VS code just type /\*\* the line before the function stub and autocomplete.
3. Export interface token as string. Convention is `export const XServiceInterfaceToken = "XServiceInterface"`.
4. Export token and interface from `src/services/interfaces/index.ts`.

### 2. Implement service

1. Create file called XService.ts in `src/services` extending the previously declared interface. Remember to annotate/decorate your class with @injectable!
2. Export service from `src/services/index.ts`

### 3. Register service with container

1. In `src/loaders/ORMLoader.ts`, register the service against the interface token.

Now your service can be injected in constructors anywhere with @inject(XServiceInterfaceToken)!

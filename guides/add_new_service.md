# Adding a New Service

As mentioned in the README, a service encapsulates business logic pertaining to either entities or actions.

We use DI to dynamically swap out services such as Email/S3 buckets for local development purposes.

To create a new service, follow the following steps.

### 1. Add interface

1. Create your interface definition in `src/services/interfaces`.
2. Add documentation in [jsdoc](https://jsdoc.app/) style. Pro tip: if you're using VS code just type /\*\* the line before the function stub and autocomplete.
3. Export interface token as string. Convention is `export const XServiceInterfaceToken = "XServiceInterface"`.
4. Export token and interface from `src/services/interfaces/index.ts`.

### 2. Implement service

1. Create file called XService.ts in `src/services` extending the previously declared interface. Remember to annotate/decorate your class with @injectable!
2. Export service from `src/services/index.ts`

### 3. Register service with container

In `src/loaders/ORMLoader.ts`, register the service against the interface token.

Now your service can be injected in constructors anywhere with @inject(XServiceInterfaceToken)!

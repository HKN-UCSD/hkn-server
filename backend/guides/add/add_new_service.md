# Adding a New Service

As mentioned in [this](../backend_api/structure.md), a service encapsulates business logic pertaining to either entities or actions. The functions of a service should take in entities or some non payload config. The service class should be stateless, and should exist to group together a group of related functions.

For example, we might have an endpoint that promotes an event's status from 'pending' to 'active'. An event must satisfy some criteria to be promoted. In this case, we can add a `changeStatus` method to the EventService class that delegates to a `canPromoteStatus` method.

We use DI to dynamically swap out services such as Email/S3 buckets for local development purposes.

To create a new service, follow the following steps.

### Implement service

1. Create file called XService.ts in `src/services` extending the previously declared interface. Capitalize whatever the 'X' placeholder has.
2. If you need non-empty constructors, create them in this format:

- `constructor(private yService: YService) {}` where YService is a service class that your current service class depends on and yService is an instance of that class.
- [Reference](https://kendaleiv.com/typescript-constructor-assignment-public-and-private-keywords/)

3. Use getRepository(_Entity_) if you need to get and interact with the data access layer (repositories) for a service function.
4. Export an instance of your newly created service class at the end of the file and name it XServiceImpl. If you do use other services, be
   sure to import their respective exported instances and use them with XService's constructor call.

- Example: `export const XServiceImpl = new XService(YServiceImpl);`

5. Export your service and its instance (XServiceImpl) from `src/services/index.ts`

Good examples are **AuthenticationService.ts** and **EventService.ts**.

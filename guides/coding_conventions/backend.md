# Coding Conventions For Backend

## Table Of Contents:
- [Controller Endpoints](#controller-endpoints)

## Controller Endpoints:
- For the same endpoint (i.e. `/api/events`), the endpoint handler for GET operations goes first in the controller file. Then the one for POST operations goes next and the one for DELETE operations goes last. Anything else that is not one of the three aforementioned operations goes below the three (if there are endpoint handlers for any of those three operations).
- Order endpoint handlers by endpoint depth, as in handlers for endpoints such as `/api/thing1` and `/api/thing2` go before handlers for `/api/thing3/thing4` and `api/thing5/thing6/thing7`. An exception of this is when the deeper endpoint is below another endpoint i.e. `/api/thing1` and `/api/thing1/thing2`. In this case, the handler(s) for `/api/thing1/thing2` should be below the handler(s) for `/api/thing1`. A good example of this is in [EventController.ts](../../backend/src/controllers/EventController.ts).
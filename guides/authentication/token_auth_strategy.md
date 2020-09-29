# Token Authentication Strategy

Docs on the strategies we use for token authentication.

## Details

There are currently two strategies for authentication user tokens:

1. Local/Development: For this strategy, user token is supposed to be their user ID. If the the ID's format is valid, look for a user with that ID. If a user exists, then the user is authenticated; the user is unauthenticated otherwise.
2. Production: Use Firebase Auth to obtain the user ID from the user token being sent in. If the token is valid, then get the user ID, if not then give an error. Then, if the user ID's format is valid, look for a user with that ID. If a user exists, then the user is authenticated.

We use devAuth (a boolean) from our config object to choose which strategy to use. If devAuth is equal to `true`, the local token authentication strategy is used. If devAuth is equal to `false` (or any other string), the production token authentication strategy is used.

## Use cases

_Local_: You would typically want to use local strategy if you are testing backend by itself, especially its API endpoints, making requests from Postman and not using frontend to make requests. This is the case since it is convenient and no mechanism for getting a token that Firebase Auth can check is needed. However, this should **not** be used at all in production.

_Production_: This should be used for production deployments, as well as testing backend interation with frontend code, with the HTTP requests being made from frontend. Using this strategy for local testing of backend without connecting frontend is fine too, just make sure you're passing in a valid token for Firebase Auth to check (how you get that valid token is up to you).

# Auth Middleware

## Rationale

Auth middleware was created so that we have role-based access control (RBAC) on the backend to ensure that not everyone can access whichever endpoints we have for the server. This middleware allows us to assign and enforce access rights to endpoints based on a user's role, giving users with permitted roles access to an endpoint (or at least access to a type of HTTP request on an endpoint) and denying access to those without.

## Description

We have five auth middlewares for the five roles that we use in our system.

- `AdminAuthMiddleware`: Gives access only to users with admin role.
- `OfficerAuthMiddleware`: Gives access only to users with admin/officer role.
- `MemberAuthMiddleware`: Gives access only to users with admin/officer/member role.
- `InducteeAuthMiddleware`: Gives access only to users with admin/officer/member/inductee role.
- `GuestAuthMiddleware` or no auth middleware: Gives access to all roles.

With these, you can put them on any endpoint for a specific HTTP request type and restrict that request to users with certain role. Only one middleware should be used for an HTTP request. Since an endpoint can allow for multiple HTTP request types, each of those request types would have only one auth middleware on them (if you need auth for those request types).

## How To Use

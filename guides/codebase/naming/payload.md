# Payload Naming Convention(s)

Keep in mind that **all payloads have to be based off of an existing Entity (./src/entities) in the database.** This means all files in the payloads folder have to be named after an existing Entity.

## Optional Default Payload Classes

For all files in ./src/payloads, if you want, you can always have a default payload class for request and response stemming from the respective Entity. There should only be two of these for each file in ./src/paylods, one for request and one for response. They should be named **XRequest** and **XResponse**, respectively, with X being the name of an Entity.

Examples:

`export class AttendanceRequest {...}`
`export class AttendanceResponse {...}`

Note that these default payload classes are not required, so you don't need to always have them in your payload files. If you do have them, you don't need to have both either. Do whatever works for your use case or situation in this regard.

## Other Payload Classes

For the rest of the payload classes, follow this format:

- **`(1)(2)(3)`**

**(1)**: The name of the payload file that your new payload class in in. For example, if your new payload is in ./src/payloads/AppUser.ts, then (1) = "AppUser".

**(2)**: The name of the entity/object/etc. that you need your new payload class for. This is more inclusive than (1) in the sense that
you can have more than just names of existing entities.

- Having an existing entity's name that is different from (1) for (2) means your new payload class is to be used in a request/response payload stemming from (2) or to be used as a request/response payload for some HTTP request on some endpoint in (2)Controller (Controllers are named as {Entity}Controller).
  - Note that there may be other reasons why you would want (2) to have an existing entity's name. Therefore, as long as there is some definite connection between your new payload class and an Entity is not identical to (1), you can use that entity's name for (2).
- Having a non-entity name for (2) means your new payload class is meant to be used as a request/response payload for some specific purpose
  or endpoint. Some examples are: - `AppUserRolesResponse` This payload is in ./src/payloads/AppUser, is supposed to be a response payload, and is a payload for endpoints that responds with role(s) of AppUser(s). - `AppUserPKPayload` This payload is in ./src/payloads/AppUser, is supposed to be a general payload (most likely used in another request/response payload), and is a payload contains the PK of some entity (in this case AppUser).

**(3)**: "Request", "Response" or "Payload".

Some examples:

- `AppUserEventRequest` (1) - AppUser, (2) - Event, (3) - Request
- `AppUserPKPayload` (1) - AppUser, (2) - PK, (3) - Payload
- `EventAttendanceResponse` (1) - Event, (2) - Attendance, (3) - Response
- `AppUserGradYearResponse` (1) - AppUser, (2) - GradYear, (3) - Response

Note that you have **A LOT** of discretion in choosing what to have for (2) because the points listed above for (2) are not meant to be exhaustive. With that said, please do follow the presented format and try to be as accurate and concise as possible in what you put for (2). It will help others immensely in working with payloads that you have made.

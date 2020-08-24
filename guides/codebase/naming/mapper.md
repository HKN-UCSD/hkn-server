# Mapper Naming Convention(s)

Keep in mind that **all mappers have to be based off of an existing Entity (./src/entities) in the database.** This means all files in the mappers folder have to be named after an existing Entity (like {Entity}Mapper.ts).

## Optional Default Mapper Functions

For all files in ./src/mappers, if you want, you can have these three default mapper function names. They are all optional, and you can have any of the three in your mapper class (no need to have all three of them). The three default function names are:

- `requestToNewEntity`
- `requestToExistingEntity`
- `entityToResponse`

where request, entity and response are all directly related to the Entity that your mapper class is responsible for. This means both request and response have to be a valid payload in ./src/payloads/{Mapper class's Entity}, and entity is just the Entity that your mapper class is responsible for.

## Other Mapper Functions

For the rest of the mapper functions, their names should be similar to the three default ones in structure (still requestToNewEntity, requestToExistingEntity, entityToResponse) but you can add or remove words so it fits better with what you're trying to do. Some examples are:

- `entityTo{CustomResponseName}Response`: Maps an entity to a response payload corresponding that the type of that entity (AppUser, Attendance, Event, etc.).
- `{customRequestName}RequestTo(1)Entity`: Maps a request payload to an existing Entity, where (1) is "New", "Existing" or "".
- `requestToEntityByEmail`: Takes in an email that can be used to find the corresponding AppUser. If such AppUser exists, then call requestToExistingEntity on the request payload; otherwise, call the requestToNewEntity on the request payload (from ./src/mappers/AppUserMapper).

Note that all mapper function names must indicate some kind of mapping from a request payload to an entity or some kind of mapping from an entity to a response payload, where request/response payload belongs and entity corresponds to an existing Entity in the DB.

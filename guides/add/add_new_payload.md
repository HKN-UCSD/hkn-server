# Adding a New Payload

A payload is, to quote the root-level README, "a class corresponding to either a request or a response object corresponding to the bodies of POST/PUT/PATCH requests, or the responses of a general HTTP request". We use payloads to clearly define what we expect to have in a request
object or a response object.

Refer to **guides/naming/payload.md** for naming conventions for payloads.

To create a new payload, follow the steps below.

### 1. Determine which file in **src/payloads** your new payload belong to

If you want to make a new payload for AppUser entities, then go to **src/payloads/AppUser.ts**. Generally, if you want to make a new payload for some T entity, then go to **src/payloads/{T}.ts**.

If a file for the entity you want to make a payload for does not exist, make a new file with the name {entity}.ts

### 2. Create an empty class for your new payload

Example: `export class YourNewPayload {}`

### 3. Add the properties you need for your new payload

Example:

```
export class YourNewPayload {
  name: string;
  email: string;
  etc.
}
```

Note: Add keyword "readonly" in front of the properties only if your payload is for a request object, i.e. `readonly name: string`. If your payload is a response object then no need to worry about this.

### 4. Add schema validation to your payload class via decorators

Schema validation for request/response object is done using [class-validator](https://github.com/typestack/class-validator). Add validation
decorators right above the properties of your payload class.

Example:

```
export class YourNewPayload {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsOptional()
  year: number;

  etc.
}
```

And now your new payload class is ready to go!

Check out **src/payloads** to find more good examples of payload classes and to see how validating an array is done (MultipleAppUserResponse in **src/payloads/AppUser.ts**).

# Rules for Logging

## 1. Logging a method:

- Always use @LogMethod decorator to log a method, whether that method be a handler for an endpoint (in controllers) or a service method.
- For @LogMethod, you must include a level which is one of **error, warn, info** or **debug**, and a message.
- Optionally, you can include a third parameter to add more information to the log. This third parameter is a JS object, where the key is the label of the info you want to include, and value is the info itself (of type string).

## 2. Logging a variable:

- Import logger to whichever file you need logging for, and do `logger.log(level, msg, obj)` on a variable/const whose value you want to keep track of. If you can think of a better way of doing this, other than just putting it in a pass-through function, please let me know so
  we can consider that option instead.
- Include in your log the variable's name, the method/function it belongs to and the value of the variable (if applicable).

## 3. Logging endpoints (in src/controllers, at the method level):

- Remember to include the endpoint route (i.e. /api/events/) and the method of the request on the endpoint (i.e. GET, POST).
- For the `message` portion of the log, the format should be `Requested endpoint to [what the endpoint does]`
- All logs for our endpoints at the method level (`@LogMethod`) should only ever be logged at `info` or `debug`.

## 4. Logging non-endpoint methods:

- Do not need to follow the first two rules for part 3.
- Can use any level of logging of the 4 provided, unless required otherwise.

## 5. Other rules:

- We only need **error, warn, info, debug** for logging, so please stick to these and do not add more log levels to our logger.
- Similarly, please do not push any changes to the base format of the logs determined at the createLogger() call. Please go over any
  changes you would like to make with the team beforehand regarding the base format.
- Feel free to add even more information to your logs than what is required. However, you must have all that is mentioned above in rules 1 to 4 at the minimum.
- If logging manually using `logger` itself, please only use **logger.log()** and not _logger.{error, warn, info, debug}()_ for consistency.

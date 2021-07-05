# Rules for Logging

## 1. Logging a variable:

- Import logger to whichever file you need logging for, and do `logger.log(level, msg, obj)` on a variable/const whose value you want to keep track of. If you can think of a better way of doing this, other than just putting it in a pass-through function, please let me know so
  we can consider that option instead.
- Include in your log the variable's name, the method/function it belongs to and the value of the variable (if applicable).

## 2. Other rules:

- We only need **error, warn, info, debug** for logging, so please stick to these and do not add more log levels to our logger.
- Similarly, please do not push any changes to the base format of the logs determined at the createLogger() call. Please go over any
  changes you would like to make with the team beforehand regarding the base format.
- Feel free to add even more information to your logs than what is required. However, you must have all that is mentioned above in rules 1 to 4 at the minimum.
- If logging manually using `logger` itself, please only use **logger.log()** and not _logger.{error, warn, info, debug}()_ for consistency.

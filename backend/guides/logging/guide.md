# Guide To Logging In The Backend Codebase:

## Logging Functions And Variables:

- To log functions and variables, use the two given functions `logFunc()` and `logVar()` in [logging.ts](../../src/logging.ts).
- Please do not use anything else to log functions and variables, as we would like to keep it as consistent as possible across the board with `logFunc()` and `logVar()`.

## Logging Anything Else:

- When logging anything else other than functions and variables (i.e. when you don't need to log a function or variable, but just a message of some sort), use [this](./how_to_add_log.md) guide, which involves importing the logger itself to where you need logging.

## Environmental Variables:

- For local development, in backend/.env, set the environmental variable "MAX_LOG_LEVEL" to the desired value for the max level of log to show. i.e.
  "MAX_LOG_LEVEL=debug" to show all 4 levels
- For Heroku deployment, got to Settings -> Config Vars, and similarly set the MAX_LOG_LEVEL.

## Some Things To Note:

- Only use `error` level when logging a situation that can lead to an error (i.e. something becomes undefined when it's not supposed to).
- For file names, put the actual file name with its corresponding extension. Do not put the file _path_.
- If you don't pass a specific log level to `logFunc()` and `logVar()`, the log level is `info` by default. If you pass a log level that does not match any of the four that we use (`error`, `warn`, `info`, `debug`), it defaults to `info`.
- When logging a function/method using `logFunc()`, put the logging call at the beginning of the function/method body.
- Note that `logFunc()` and `logVar()` contain a lot of optional parameters, so most of the time you don't use all of their parameters and instead you only need 2-3 parameters per `logFunc()` or `logVar()` call.

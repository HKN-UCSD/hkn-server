# Log Usage

## Error logging:

- Should only be used when an error occurs, i.e. an object is **null** when it's not supposed to. In general, use this when something that isn't supposed to happen happens, or when something goes wrong.

## Warn logging:

- Should be used when a problem occurs that is serious enough to let (oncall) developers know just in case, but not serious enough to be called an _error_, i.e. it does not affect the operations of the backend API.

## Info logging:

- This should be used to display various information about the current state of the backend code when it is processing certain requests and responses, among other things, particularly information that would be useful for production/oncall debugging.
- Try not to use this for error and warning logs.

## Debug logging

- This should be used to display various information about the current state of the backend code particularly information that would be useful for developers for (local) development and debugging.

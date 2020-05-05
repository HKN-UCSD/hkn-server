# Adding New Firebase Functions

## Definition

We define a firebase function as a function that interacts with the backend, which is currently Firebase.

All firebase functions may be found in the src/services folder.

For example, to create a function that gets events, you should add the corresponding function in src/services/events.js.
Please make sure to return promise wrapping JS objects/arrays and not snapshots! The user of the firebase functions should not have to know about what you're doing with the snapshots!

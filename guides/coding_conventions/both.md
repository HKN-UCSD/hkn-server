# Coding Conventions For Both Frontend and Backend

## Table Of Contents:
- [TypeScript + JavaScript](#typescript--javascript)
- [Import Statements](#import-statements)
- [File Organization](#file-organization)
- [Libraries To Use](#libraries-to-use)

## TypeScript + JavaScript:
- Always use TypeScript instead of JavaScript, i.e. using `.ts/.tsx` file extensions instead of `.js/.jsx`. The only exceptions are when we absolutely have to use JS files, such as config files of third-party packages that tend to be JS files.
- Always use [TS interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) over [type keyword](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) for defining object types. Only use `type` keyword for aliasing or defining union types.
- Put `const` and `let` declarations at the top of the function/method if possible, unless you must put it elsewhere.
- TS types and interfaces, along with any global constant should be defined after import statements and before the function/method/class being written for the file being used.
- Always use `async/await` for API calls on the frontend and DB calls on the backend, unless the API call/DB call involved does not need `async/await` (rarely ever happens).
- To interact with array objects, try to use `.map()`, `.reduce()` and `.filter()` to accomplish whatever you need to do with your array. If none of those can help you, then resort to `for` loops.
- Use object destructuring as opposed to using `objectThing.thing1`, `objectThing.thing2`, etc. unless object destructuring ends up being more cumbersome, which doesn't happen often.
    - Example: `const { thing1, thing2, thing3, ... } = objThing;`

## Import Statements:
- Import organization:
    - Always maintain the order `External packages/libraries -> Internal files not using path aliases -> Internal files using path aliases`.
    - If our file has 5 or more imports, always put import statements for external packages/libraries at the beginning of the files (i.e. `React`, `date-fns`, etc.) and group them together (call this `Group 1`). Next, group import statements for internal files without using path aliases (i.e. `../../components/my-component/index`) together (call this `Group 2`) and put them below `Group 1`. Lastly, group import statements for internal files that use path aliases together (call this `Group 3`) and put them below `Group 2`. Each group are separated from each other by an empty line in between.
    - If our file has less than 5 imports, put them all together without separation but still maintain the aforementioned order.

## File Organization:
- Constants that are used in more than one file need to be put in the `src/constants` folder of frontend or backend, correspondingly.

## Libraries To Use:
- For handling date time objects and date time stuff in general, use `date-fns` since this is added as a dependency to both the frontend and backend codebase.
# Coding Conventions For Frontend

1. For `.tsx` files, always put the import statement for `React` at the very beginning of the file.
    ```
    import React from 'react'; // Start of file
    ... // Other imports
    ```
2. For React components, never use `PropTypes` or `propTypes`. Instead, opt for [TS interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) to add typing for component props and default values.
3. Use React functional components instead of class components for all React components we are making in the frontend codebase, including the Page components in `frontend/src/pages`. Keep in mind that if you need to use `this` keyword in your functional component, you must use `function` keyword instead of the arrow function syntax (i.e. `() => {}`).
    - Functional components using `this`:
        ```
        function MyComponent(props) {
          ...
        }
        ```
    - Functional components not using `this`:
        ```
        const MyComponent = props => {
          ...
        };
        ```
4. Put hook calls (`useState()`, `useHistory()`, etc.) that return objects, arrays, values, etc. before anything else in a function/method body (put them at the very beginning) unless you have to do otherwise. Other types of hooks can be put elsewhere as needed. 
    - Furthermore, for the hooks that are put at the beginning of the function/method body, always have `useState()` at the very beginning if you do use it.
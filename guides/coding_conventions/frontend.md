# Coding Conventions For Frontend

## Table Of Contents:
- [Import Statements](#import-statements)
- [React Components](#react-components)
- [React Hooks](#react-hooks)
- [URL/Routes Handling](#urlroutes-handling)

## Import Statements:
- For `.tsx` files, always put the import statement for `React` at the very beginning of the file.
    ```
    import React from 'react'; // Start of file
    ... // Other imports
    ```

## React Components:
- For React components, never use `PropTypes` or `propTypes`. Instead, opt for [TS interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) to add typing for component props and default values.
- Use React functional components instead of class components for all React components we are making in the frontend codebase, including the Page components in `frontend/src/pages`. Keep in mind that if you need to use `this` keyword in your functional component, you must use `function` keyword instead of the arrow function syntax (i.e. `() => {}`).
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
- We can use `<></>` to return an empty component if we need to do some conditional rendering i.e. if true, render our component; if false, render empty component (displays nothing).
- For our major underlying UI framework, we use `Material-UI`. This means that most UI components you need to import to use should be from `Material-UI`, except for times where you need to use something that `Material-UI` does not provide (i.e. QR code).
- Prioritize using abstracted components in `@SharedComponents` (or `frontend/src/components`) as opposed to importing the UI package's version of the component. The only exception is when `@SharedComponents` doesn't have what you need and you can't make what you want from what is already there in `@SharedComponents`.
    - The components in `@SharedComponents` are actually abstractions implemented on top of the UI package's components. This is to maintain standardization of component usage across the frontend codebase so everyone isn't using different components for the same purpose. It is also to make it easy on developers by using these abstractions so they need not reimplement existing components.
    - Example:
        - Do this:
            ```
            import { EventStatusDropdownField } from '@SharedComponents';

            ...
            ...

            /* Use right away without any extra work, stays the same when used in multiple places in codebase */
            <EventStatusDropdownField {...props} /> 
            ```
        - Don't do this:
            ```
            import { Dropdown } from 'some-third-party-package';

            ... // Props set up and style and more code just to make Dropdown do what we want
            ...

            /* Have to do all these set up steps each time we want a dropdown */
            <Dropdown {...props} />
            ```

## React Hooks:
- Put hook calls (`useState()`, `useHistory()`, etc.) that return objects, arrays, values, etc. before anything else in a function/method body (put them at the very beginning) unless you have to do otherwise. Other types of hooks can be put elsewhere as needed. 
    - Furthermore, for the hooks that are put at the beginning of the function/method body, always have `useState()` at the very beginning if you do use it.
- Use `useHistory()` to navigate to different pages instead of `component={Link}` prop and `to={url}` props of `<Button />`.

## URL/Routes Handling:
- Use `query-string` to parse query parameters from different URLs. This is what we decided upon so let's stick with this. Example code: https://github.com/HKN-UCSD/hkn-server/blob/master/frontend/src/pages/QueriedEventPage/index.tsx.
- For URLs with URL parameters (different from query parameters), create a function to pass input values into those URL parameters in `frontend/src/constants/routes.js`. An example is `EVENT_DETAILS` and `EVENT_DETAILS_WITH_ID` in [here](../../frontend/src/constants/routes.js). To extract those URL parameters programmatically, use react-router's `useParams()`.
# Creating New Pages

## Definition

Page-level components/containers or whatever you want to call them, are components that are directly rendered by Route in src/components/App/index.js.

These are meant to be 'containers' that hold state, make queries, and render stateless components.

As a general rule of React, you want to make any queries to the backend as needed in the componentDidMount method, then update state as query results come back. This allows you to render loading rotating thingies while you're waiting for the query results to come back.

## Access Control

Permissions are controlled by wrapping the page-level component with a permissions HOC as defined in src/HOCs. See pages/App/index.js for examples.

The other nice thing is that there's a AuthUserContext instantiated within App/index.js. Thus to check if the currently logged in user has a particular role, you can subscribe to AuthUserContext to get the current claims of the user.
Note that there's no need to manually parse through the userclaims to check for roles. Instead, use the isOfficer, isInductee, isMember functions defined in services/claims to check if the currently logged in user is an Officer.

As an example, lets say you get **userClaims** from the context. Calling isOfficer(userClaims) returns a boolean indicating whether or not the user is an Officer or not.

## Example

Let's say we want to make the /events/:id page. First define your endpoint in src/constants/routes.js. You'd create a new page-level component in the src/pages folder called EventDetailPage with the corresponding state, then put any calls to Firebase in componentDidMount, using the functions from src/services. You would then reuse the stateless functional components in the render method of the page-level component.

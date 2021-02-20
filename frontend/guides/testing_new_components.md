# Testing New Components

## Context

Trying out bottom-up, component-first development.
The idea is that as a team, we can develop individual components and jam them together into a page later on.

## Steps

In general, branching off master is fine.
Branch off events branch.

```bash
git checkout events; git checkout -b name_of_your_component
```

To add a new component, add a new folder within src/components with index.js + styles.js. See src/components/EventCard for details.

In src/Pages/App/index.js you will find our React Router on line 91.
Here just add a new route rendering the component you're developing. You'll be discarding this route before making your pull request - it's just for development/testing purposes.

From this point, you should be able to just navigate to that route and see your component being rendered.

## Important Notes

With the exception of the Button component, none of the components should be stateful and so you should be able to write them as functional stateless components. Data for your components will be passed in through props. If you think your component requires state - @channel in dev and we can discuss more.

As a reminder - all of our UI components can be found in Material UI, no need to reinvent the wheel there.

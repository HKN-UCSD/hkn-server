# Procedure When Working On Full Stack Issues:

You need not worry too much about this documentation if:
- You are working on a frontend-only issue where the only changes involve UI and using what is already there.
- You are working on a backend-only issue where creating/updating/removing an endpoint and its handler is not involved.
- You are working on a full stack issue where changes in the backend do not affect the frontend in any way and vice versa (we don't really have a lot of these).

However, it's still a good read and you will need to go through this anyway when you work on a **full stack** issue, which can be thought of as an issue involving developing on both frontend and backend and making them work together in some way.

## Procedure:
1. Figure out if your issue involves adding breaking changes to the API that the frontend needs to "know" so it can still function properly (since frontend relies on the backend API to run properly). If no, then you're good. Otherwise, follow the next steps.
2. Implement your solution to the issue you are assigned to that introduces breaking changes to the backend API.
3. After that, we would like to sync the frontend up with these new changes from the backend. Start the backend server locally on your system. Make sure the backend server you started contains the changes you made. Try navigating to `http://localhost:3001/api/docs` to be sure your backend server is up.
4. Spawn a separate terminal for frontend folder. Then, open `frontend/package.json` and go to `scripts` then `codegen`. Change the URL after the `-i` flag to `http://localhost:3001/api/docs/json`.
5. Run `npm run codegen`. After the command is done running, the frontend is now synced up with breaking changes from backend.
6. Start frontend portal locally on your system to make detecting breaks in the frontend easier. You can also start frontend portal locally after you fix all breaking points on _Step 8_.
7. Update whichever file you need in the `services` folder of frontend, but remember not to manually modify `api` and `ApiConfigStore.ts` in any way. Update whichever page and/or component that uses the updated services so that frontend doesn't break.
8. Fix all breaking points resulting from the `codegen` call and do a sweeping manual test to make sure everything is still working *as intended*.
9. If you need to make more changes or fix some bugs resulting from your changes on the backend, repeat the steps above.
10. Remember to revert anything you changed in configs to be able to run FE/BE servers locally to its original state.
11. Commit and push the code to your branch.

## Examples Of Full Stack Issues:
- Issues involving adding a new endpoint and endpoint handler to an existing controller, or adding a completely new controller with a number of new endpoints on it.
- Issues involving modifying the endpoint handlers in some way, i.e. the contents of the query parameters, the request/response payload, the route parameters (how many of them, what they are, etc.), handlers' parameters, etc. anything that would make the calls from FE to these endpoint handlers not work anymore.
- This means that issues that only involves updating services in the backend most of the time won't need the full stack treatment above, just make sure that you only actually need to change the services and not anything else.
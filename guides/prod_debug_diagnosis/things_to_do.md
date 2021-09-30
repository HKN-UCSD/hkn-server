# Things To Do When Debugging/Diagnosing Production Issues:

## Timeframe To Work On Production Issues:
- We strongly prefer that production issues be worked on as soon as possible, usually just a bit after the issue occurred in order to keep our portal and database properly functional and updated with the correct information in the most timely manner.

## Use Monitoring Tools To Diagnose Slowdowns:
- If there are issues with slowdowns on the portal or even just the backend API itself, it is worthwhile to use Datadog, our monitoring service that we have set up all the infrastructure for.
- Slowdowns on the portal are usually caused by a query to an endpoint taking a significantly higher amount of time than usual, or a spike in the amount of users querying an endpoint. There might be other causes as well, but these are just the two common ones.
- Set up an account with Datadog if you haven't already. Then, log in to Datadog, go to Dashboards then Server Metrics. 
- There, you'll see `P95 for Response Time`, `Average Response Time by Route` and `Average Requests by Route`. Use these to help identify the potential root cause of the slowdowns users experience on the portal.
- Furthermore, you can even create more widgets (i.e. timeseries graphs) to better visualize and understand what is going with the requests to our backend API and responses from it. Use existing widgets mentioned above as reference to create new ones.

## Use Logging To Understand What Is Being Executed For An Action:
- Since we now have logging set up for our backend codebase, use it to see which method is being called, what parameters they are being called with, etc. in order to help you diagnose a production issue.
- As of now, logs go straight to the console, so you can only see logs when you run the backend code locally.
- More will be added to this part of the documentation in the future.

## Reproducing An Production Issue On (Local) Development Portal and Backend:

Note that not all issues are consistently reproducible, so one might devise other ways to get to the root cause of those issues in addition to the steps provided below.

Steps:
- Identify what the issue is, the actions it took to trigger the issue, and where on the portal or API it is happening at.
- Checkout to master branch and pull from it.
- Either:
    - Make direct changes on master branch if you need to (usually when a fix is needed very urgently; this is not recommended anyway) and you need permissions on GitHub to even do so.
    - Or create a new branch derived from master and checkout to that new branch.
- Either: 
    - Start up portal and API locally using `Docker` and `Docker Compose`
    - Or start the development API locally using our development DB and/or start the development portal using the development API you just started or the development API hosted at `dev-api.hknucsd.com`.
- After you have everything set up, try to reproduce the issue on the portal and API you are running by going through the steps that led to the reported issue.
- From there, based on the steps you are taking to reproduce the issue, try to narrow down where the issue might be happening in the codebase i.e. in frontend or backend, in which folder/file, etc. Once you have identified the offending folder(s) and file(s), find out which lines of code are causing the issue.
- From there, implement a fix for the issue on the spot if you can do so. If not, report the issue to the dev team or dev team lead so everyone can work together on implementing a fix to the issue.
- If you decide to fix the issue yourself, remember to leave a commit or PR message on what the issue was and how you fixed it (try to be as detailed as you can). Make a PR for your fix and merge it in to master after getting the necessary approval(s).
- If you are working directly on master branch and you have permission to commit and push straight to master, you can go ahead and do so. **However, if your fix breaks our deployments (i.e. your fix contains bugs) then you are responsible for fixing the bugs that came up from your fix**.

## Connecting To Production DB To Directly Modify Data When Needed:
- Sometimes when a user inputs data incorrectly or forgets to do certain steps in the workflow of a functionality on the portal i.e. officers forgetting to check an attendee off, an inductee signing in to an event later than their actual arrival time, etc. the data recorded in our DB does not correctly reflect what happened in reality. Thus, one of the ways to remedy this is to directly modify the affected portion(s) of the database in production.
- To connect to the production DB:
    - Log in to our Heroku account, then go to the Heroku app for our production backend `hkn-server`.
    - Go to "Resources" and get the URL to the production DB from there.
    - Install PostgreSQL on your system from [here](https://www.postgresql.org/download/) if you haven't already done so.
    - Open up a terminal of your choice. Run the command `psql -d [production DB URL]`. If you are on Windows, make sure that you have PostgreSQL in your System Environment Variables (should be added automatically when installing PostgreSQL, look up a guide on your own on how to add it if it hasn't already been added).
    - Modify **ONLY** the affected portion(s) of the data to correctly reflect what happened in reality.

### What Not To Do When Connecting To Production DB And Modifying It Directly:
- Mess around with the existing data i.e. modifying/deleting data when you don't need to.
- Run any `DROP TABLE` query on production DB.
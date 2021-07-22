# Things To Do When Debugging/Diagnosing Production Issues:

## Timeframe To Work On Production Issues:
- We strongly prefer that production issues be worked on as soon as possible, usually just a bit after the issue occurred in order to keep our portal and database properly functional and updated with the correct information in the most timely manner.

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

## Reproducing An Issue On Development Portal and Backend:
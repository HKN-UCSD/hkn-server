# Adding a New Entity

Or updating a new entity... :)

## Overview

Changes to anything within the `src/entities` folder corresponds to a change within a table in the
database. We capture these changes by generating migrations.

This guide assumes that you are using the local Docker database.

## Migrations

Each migration is a change to the database schema captured in the form of a SQL script. Such a
script has an up component and a down component. Applying the migration applies the up component,
and reverting the migration applies the down component.

Migrations may be generated with the following steps **after you have made changes to src/entities**:

- Start with a clean database. Running `npm run localpg:start` will run all current migrations
  into a clean database.
- Run `npm run migration:gen -- -n name-of-migration` where name-of-migration should describe the
  changes made. After running this command, you should see a new migration file under `src/migrations`.
  Please read the generated SQL and ensure that everything looks reasonable.
- Running `npm run migration:run` will run all migrations(including the new one). Now you should see
  that the changes are reflected in the new Postgres database. If this command fails, then something
  is wrong with the generated SQL - at this point it would be useful to ping @dev with a screenshot.
- After generating the migration, we have to run it against both our prod and dev databases on
  portal.hknucsd.com and dev-portal.hknucsd.com. This should be run automatically in the future, but
  for now please tag me (Godwin) when you open a PR and I can run it **before** you merge in your
  changes.

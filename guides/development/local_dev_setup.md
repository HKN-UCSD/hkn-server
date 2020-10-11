# How To Set Up Local Development Environment

## Prerequisites:

- Install Docker Desktop on your system
  - General [guide](https://docs.docker.com/get-docker/)
  - [Guide](https://docs.docker.com/docker-for-windows/wsl/) for Windows 10 versions without Hyper-V

## Step-by-step Guide:

To correctly set up local environment for development, follow the steps below.

### 1. Change DATABASE_URL in your .env file to the local DB URL

If you do not already have a .env file in the project root folder, then go ahead and make one. Please ask a maintainer of the project for all of the environment variables needed.

The database URL will be the URL of the local Postgres database hosted in a Docker container.

### 2. Run npm commands to set up local Postgres DB (sequentially)

- `npm run localpg:start`

  - This runs `npm run postgres:start`, `npm run migration:run` and `npm run seed:run`, which starts up a Postgres container with the local Postgres DB, then runs a migration script on that local DB to initialize the structure of the DB, then runs a seed script on that local DB to insert initial data to the DB.

- `npm run start`
  - This is to start up the server, served on `localhost:3001` by default.

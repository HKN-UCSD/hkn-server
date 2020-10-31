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
  - Note for Windows VSCode users: `npm run postgres:start` won't work on Windows VSCode, so copy paste the right clause of the && statement (`docker run -t -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user postgres:12.3`) in `npm run postgres:start` to replace `npm run postgres:start` in `npm run localpg:start`.

- `npm run start`
  - This is to start up the server, served on `localhost:3001` by default.

# HKN Portal Monorepo

All code related to the HKN portal belongs here.

Portal Link: https://portal.hknucsd.com/

## Frontend And Backend READMEs And Guides:
- Frontend:
    - Top-level [README](./frontend/README.md)
    - [Guides](./frontend/guides)
- Backend:
    - Top-level [README](./backend/README.md)
    - [Guides](./backend/guides)

## Quick Access To Guides:
- On all things [git](./guides/git), such as branch naming, the PR process, the branch creation process, etc.
- On [coding conventions](./guides/coding_conventions) for frontend, backend and both.

## To Install Dependencies

Do this before you build/start the project!

Check if you have node version 12.14.0. Then, run...

`cd frontend; npm i; cd ../backend; npm i; cd ..`

## To Start Fullstack

`docker compose up`

## To Rebuild Containers From Images

`docker compose up --build`

## To Remove Containers

`docker compose down`

## To Develop Frontend In Isolation

Make sure that the api url in your .env file points to our hosted dev-api server if you'd like to
develop frontend in isolation

`cd frontend; npm run start`

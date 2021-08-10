# HKN Portal Monorepo

All code related to the HKN portal belongs here.

## Frontend And Backend READMEs And Guides:
- Frontend:
    - Top-level [README](./frontend/README.md)
    - [Guides](./frontend/guides)
- Backend:
    - Top-level [README](./backend/README.md)
    - [Guides](./backend/guides)

## Quick Access To Guides:
- On all things [git](./guides/git), such as branch naming, the PR process, the branch creation process, etc.
- On how to work with issues that require working on the [full stack](./guides/full_stack_dev) - both frontend and backend.

## To Install Dependencies

Do this before you build/start the project!

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

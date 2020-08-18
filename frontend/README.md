# HKN Member Portal

[![Netlify Status](https://api.netlify.com/api/v1/badges/a3579e7f-2f69-426b-8a0a-01c5059e5f86/deploy-status)](https://app.netlify.com/sites/hkn-portal-staging/deploys)

A member portal for UCSD HKN members to submit their resume and log membership points.

![image](https://user-images.githubusercontent.com/24837420/63902605-29e01a80-c9bf-11e9-8c66-f03b396e119c.png)

![image](https://user-images.githubusercontent.com/24837420/63902535-f2716e00-c9be-11e9-9995-4f02345d5183.png)

**Live**: [https://hkn.ucsd.edu/member-portal/](https://hkn.ucsd.edu/member-portal/)

# Table of contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

# Prerequisites

- Install nvm [Unix/MacOS/WSL](https://github.com/nvm-sh/nvm) or [Windows](https://github.com/coreybutler/nvm-windows)
- Install [Node.js](https://nodejs.org/en/)
- (If you have to deploy) Install [Firebase CLI](https://github.com/firebase/firebase-tools/)

# Getting Started

- Install dependencies

```
npm install
```

- Ask [current code owners](https://github.com/HKN-UCSD/hkn-member-portal/blob/master/CODEOWNERS) for the .env file for the dev database. Save .env file in project root.
- Build and run the project - project will be served at http://localhost:3000.

```
npm run start
```

## Common Problems

- Oh my I see a white screen in my browser, what could possibly have gone wrong? - Make sure you have .env file in root :)

# Project Structure

| Name                 | Description                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **src/components**   | Reusable components go here                                                                                                                                                               |
| **src/pages**        | Pages go here - a page is a component that is directly rendered by a Route in our react router                                                                                            |
| **src/constants**    | Constants go here                                                                                                                                                                         |
| **src/images**       | Contains images used throughout project                                                                                                                                                   |
| src/contexts.js      | React contexts go here                                                                                                                                                                    |
| src/index.js         | Entry point of app                                                                                                                                                                        |
| src/serviceWorker.js | Runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages                                 |
| .env                 | Environment variables                                                                                                                                                                     |
| firebase.json        | Defines Firebase Hosting configuration                                                                                                                                                    |
| **public**           | Contains base files that will be accessible to the public                                                                                                                                 |
| public/404.html      | Page not found                                                                                                                                                                            |
| public/favicon.ico   | The favicon to be displayed on the browser tab                                                                                                                                            |
| public/index.html    | Template HTML app                                                                                                                                                                         |
| public/manifest.json | A [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) that describes this application and it's used by e.g. mobile phones if a shortcut is added to the homescreen. |
| **scripts**          | Contains convenient scripts                                                                                                                                                               |

# License

Copyright (c) IEEE-Eta Kappa Nu (HKN) Kappa Psi. All rights reserved.
Licensed under the [MIT](LICENSE) License.

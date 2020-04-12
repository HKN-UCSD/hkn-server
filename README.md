# HKN Member Portal

A member portal for UCSD HKN members to submit their resume and log membership points.

![image](https://user-images.githubusercontent.com/24837420/63902605-29e01a80-c9bf-11e9-8c66-f03b396e119c.png)

![image](https://user-images.githubusercontent.com/24837420/63902535-f2716e00-c9be-11e9-9995-4f02345d5183.png)

**Live**: [https://hkn.ucsd.edu/member-portal/](https://hkn.ucsd.edu/member-portal/)

# Table of contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Creation](#environment-creation)
- [Deploying the app](#deploying-the-app) - [Set up Firebase CLI](#set-up-firebase-cli) - [Build the app](#build-the-app) - [Deploy](#deploy)
- [License](#license)

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

---

## If you're not deploying you can stop reading here :)

---

# Environment Creation

This member portal uses Firebase to host and store its data. If you do not have access to the production .env file, you will need to replicate the Firebase project in order to test your code. In this section, I will walk you through how to create a Firebase project and replicate the settings.

1. Follow steps 1 and 2 in [Add Firebase to your Javascript project](https://firebase.google.com/docs/web/setup) document to create a new Firebase project, register your app and set up Firebase Hosting.
2. Follow **Get config object for your web app** in [Download Firebase config file or object](https://support.google.com/firebase/answer/7015592) to get the Firebase configuration for .env file.
3. Complete the .env file with the Firebase configuration for each respective variable.
4. Follow **Create a Cloud Firestore database** in [Get started with Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) to create a Firestore in **locked** mode in your project.
5. In your console, select **Rules** from the tabs under **Database**, copy and paste the following snippet into the text area:
   ```
   service cloud.firestore {
   match /databases/{database}/documents {
   	match /users/{uid} {
   	allow read: if uid == request.auth.uid &&
   					request.auth.token.member == true && request.auth.token.email_verified;
   	allow write: if uid == request.auth.uid &&
   					request.auth.token.member == true && request.auth.token.email_verified;
   	}
   }
   }
   ```
6. Follow **Create a default Storage bucket** in [Get Started on Web](https://firebase.google.com/docs/storage/web/start) to create a storage in your project.
7. Under **Rules** of the **Storage** tab, copy and paste the following snippet into the text area:
   ```
   service firebase.storage {
   	match /b/{bucket}/o {
   		match /users/{uid}/resume/{filename=**} {
   			allow read: if request.auth.uid == uid &&
   							request.auth.token.email_verified && request.auth.token.member == true
   			allow write: if request.auth.uid == uid &&
   							request.auth.token.email_verified && request.auth.token.member == true && request.resource.size < 1 * 1024 * 1024 && request.resource.contentType.matches('application/pdf')
   			allow delete: if request.auth.uid == uid &&
   							request.auth.token.email_verified &&
   							request.auth.token.member == true
   	}
   }
   }
   ```

Now you have replicated the Firebase project and completed the .env file. You can follow the [Deploying the app](#deploying-the-app) section to deploy your code via Firebase Hosting.

# Deploying the app

## Set up Firebase CLI

1. Install the Firebase CLI using npm by running: </br>
   `npm install -g firebase-tools` </br>
   This command installs globally avaiable `firebase` command. To update to the latest version of the Firebase CLI, re-run the same `npm install` command.
2. Sign into Firebase using your Google account by running: </br>
   `firebase login` </br>
   This command connects your local machine to Firebase and grants you access to your Firebase projects.
3. To test that authentication worked (and to list all of your Firebase projects), run the following command: </br>
   `firebase list`
   This displayed list should be the same as the Firebase projects listed in the [Firebase console](https://console.firebase.google.com/u/0/). If you do not have a Firebase project for this app, please follow the [Create a testing environment](#create-a-testing-environment) section to replicate a Firebase project.

## Build the app

Building the app locally is required to generate a **build** folder to deploy because the `firebase deploy` won't execute build tasks.
Build the app however you normally would:

- execute `npm run build` from a terminal window

## Deploy

Run `firebase deploy` from the terminal to deploy the app to Firebase Hosting and Firebase Functions. If you want to only deploy one of them, run `firebase deploy --only hosting` or `firebase deploy --only functions`.

# License

Copyright (c) IEEE-Eta Kappa Nu (HKN) Kappa Psi. All rights reserved.
Licensed under the [MIT](LICENSE) License.

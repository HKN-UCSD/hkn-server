# HKN Member Portal

A member portal for UCSD HKN members to submit their resume and log membership points.

![image](https://user-images.githubusercontent.com/24837420/63902605-29e01a80-c9bf-11e9-8c66-f03b396e119c.png)

![image](https://user-images.githubusercontent.com/24837420/63902535-f2716e00-c9be-11e9-9995-4f02345d5183.png)

**Live**: [https://hkn.ucsd.edu/member-portal/](https://hkn.ucsd.edu/member-portal/)

# Table of contents

- [HKN Member Portal](#hkn-member-portal)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Create a testing environment](#create-a-testing-environment)
- [Deploying the app](#deploying-the-app)
	- [Set up Firebase CLI](#set-up-firebase-cli)
	- [Build the app](#build-the-app)
	- [Deploy](#deploy)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
	- [`dependencies`](#dependencies)
	- [`devDependencies`](#devdependencies)
- [License](#license)

# Prerequisites
- Install [Node.js](https://nodejs.org/en/)
- Install [Firebase CLI](https://github.com/firebase/firebase-tools/)

# Getting Started
- Clone the repository
```
git clone https://github.com/HKN-UCSD/hkn-member-portal.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Ask [current code owners](https://github.com/HKN-UCSD/hkn-member-portal/blob/master/CODEOWNERS) for the .env file used in production or see [Create a testing environment](#create-a-testing-environment) section below to create your own credentials for testing
  
    
    Set up the following variables in .env file

    |            Variable           |              Description             |
    | ----------------------------- | ------------------------------------ |
    | REACT_APP_API_KEY             |  API key for using Firebase API      |
    | REACT_APP_DATABASE_URL        |  *project-id*.firebaseapp.com        |
    | REACT_APP_PROJECT_ID          |  https://*project-id*.firebaseio.com |
    | REACT_APP_STORAGE_BUCKET      |  *project-id*.appspot.com            |
    | REACT_APP_MESSAGING_SENDER_ID |  Sender ID                         |

- Build and run the project
```
npm run start
```

Finally, navigate to `http://localhost:3000` and you should see the member portal being served and rendered locally!

# Create a testing environment
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

# Project Structure
The full folder structure of this app is explained below:

| Name | Description |
| ---- | ----------- |
| **functions**            | Contains node modules, dependencies and script for Firebase Functions | 
| functions/index.js       | Script run by Firebase Functions 
| **node_modules**         | Contains all npm dependencies                                                            |
| **public**               | Contains base files that will be accessible to the public |
| public/404.html          | Page not found |
| public/favicon.ico       | The favicon to be displayed on the browser tab |
| public/index.html        | Template HTML page for React app |
| public/manifest.json     | A [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) that describes this application and it's used by e.g. mobile phones if a shortcut is added to the homescreen. |
| **scripts**              | Contains convenient scripts, e.g., download all resumes |
| **src**                  | Contains source code that will be compiled to the dist dir                               |
| src/components/App/index.js  | Starting point of the React app |
| **src/components/Firebase**  | |
| **src/components/Home**      | Contains components for the home page (the page after user signs in) |
| **src/compoennts/Loading**   | Contains components for the loading page |
| **src/components/Session**   | Contains codes that manage user's authentication |
| **src/components/SignIn**    | Contains components for the login page |
| **src/components/SignUp**    | Contains components for the sign-up page |
| **src/constants**            | Contains constants used throughout the project |
| **src/images**               | Contains images used throughout the project |
| src/index.js                 | Starting point of the React app |
| src/serviceWorker.js         | Runs separately from the main browser thread, intercepting network requests, caching or retrieving resources from the cache, and delivering push messages |
| .env                         | Defines variables that contain sensitive data, e.g., API key |
| .gitignore                   | Defines files to ignore when pushing commits |
| CODEOWNERS                   | Defines the code owners who are responsible for code reviews |
| LICENSE                      | License |
| package-lock.json            | Automatically generated for any operations where npm modifies either the node_modules tree, or package.json |
| package.json             | File that contains npm dependencies as well as build scripts)                          |

# Dependencies
Dependencies are managed through `package.json`.

## `dependencies`

| Package                         | Description                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| @material-ui/core               | React components that implement Google's Material Design                           |
| @material-ui/icons              | Material Design Svg Icons converted to Material-UI React components.               |
| @material/layout-grid           | Material design's responsive UI is based on a column-variate grid layout.          |
| classnames                      | A simple utility for conditionally joining classNames together.                    | 
| dotenv                          | Loads environment variables from .env file                                         |
| eslint-plugin-react             | React specific linting rules for ESLint.                                           |
| react                           | React is a JavaScript library for building user interfaces.                        |
| react-dom                       | This packages serves as the entry point to the DOM and server renderers for React. |
| react-router                    | Declarative routing for React                                                      |
| react-router-dom                | DOM bindings for React Router.                                                     |
| react-scripts                   | Configuration and scripts for Create React App.                                    |
| recompose                       | A React utility belt for function components and higher-order components.          |

## `devDependencies`

| Package                         | Description                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------- |

To install or update these dependencies you can use `npm install` or `npm update`.

# License
Copyright (c) IEEE-Eta Kappa Nu (HKN) Kappa Psi. All rights reserved.
Licensed under the [MIT](LICENSE) License.

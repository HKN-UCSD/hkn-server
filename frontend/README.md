# HKN Member Portal

**Live**: [https://hkn.ucsd.edu/member-portal/](https://hkn.ucsd.edu/member-portal/)

![image](https://user-images.githubusercontent.com/24837420/63902605-29e01a80-c9bf-11e9-8c66-f03b396e119c.png)

![image](https://user-images.githubusercontent.com/24837420/63902535-f2716e00-c9be-11e9-9995-4f02345d5183.png)

A member portal for UCSD HKN members to submit their resume and log membership points.

# Table of contents

- [HKN Member Portal](#hkn-member-portal)
- [Table of contents](#table-of-contents)
- [Pre-reqs](#pre-reqs)
- [Getting Started](#getting-started)
- [Deploying the app](#deploying-the-app)
	- [Prerequisites](#prerequisites)
	- [Set up Firebase CLI](#set-up-firebase-cli)
	- [Build the app](#build-the-app)
	- [Deploy](#deploy)
- [Project Structure](#project-structure)
- [Data Protection](#data-protection)
- [Dependencies](#dependencies)
	- [`dependencies`](#dependencies)
	- [`devDependencies`](#devdependencies)
- [License](#license)

# Pre-reqs
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
- Complete the .env file with credentials or ask current maintainers for the .env file
  
    `touch .env`
    
    Set up the following variables

    |            Variable           |              Description             |
    | ----------------------------- | ------------------------------------ |
    | REACT_APP_API_KEY             |  API key for using Firebase API      |
    | REACT_APP_DATABASE_URL        |  *project-id*.firebaseapp.com        |
    | REACT_APP_PROJECT_ID          |  https://*project-id*.firebaseio.com |
    | REACT_APP_STORAGE_BUCKET      |  *project-id*.appspot.com            |
    | REACT_APP_MESSAGING_SENDER_ID |  *sender-id*                         |

- Build and run the project
```
npm run start
```

Finally, navigate to `http://localhost:3000` and you should see the member portal being served and rendered locally!

# Deploying the app

## Prerequisites
- [**Firebase account**](https://firebase.google.com/) - You can sign in with a Google account. You would need adminstrator permission to the Firebase project *hkn-member-portal* in order to deploy.

## Set up Firebase CLI
1. Install the Firebase CLI using npm by running: </br>
`npm install -g firebase-tools` </br>
This command installs globally avaiable `firebase` command. To update to the latest version of the Firebase, CLI
**Work in progress**

## Build the app
Building the app locally is required to generate a **build** folder to deploy because the `firebase deploy` won't execute build tasks.
Build the app however you normally would:
- execute `npm run build` from a terminal window

## Deploy
**Work in progress**

# Project Structure
The full folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
**Work in progress**

# Data Protection
**Work in progress**

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

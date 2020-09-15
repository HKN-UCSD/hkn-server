import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

import * as serviceWorker from './serviceWorker';

import App from '@Pages/App';
import { config } from '@Config';

const appConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectID,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderID,
};

firebase.initializeApp(appConfig);

document.body.style.height = '100%';
document.body.style.margin = '0';
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import * as serviceWorker from './serviceWorker';

import App from '@Pages/App';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
firebase
  .firestore()
  .enablePersistence()
  .catch(err => {
    throw Error(`Firestore enable persistence failed: ${err}`);
    // Just don't cache. Catching error to ensure that it doesn't propagate out.
  });

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

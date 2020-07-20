import * as firebase from 'firebase/app';
import 'firebase/auth';

import SIGNUP_ENDPOINT from '../constants/endpoints';

const SIGN_UP_URL = `${process.env.REACT_APP_API_BASE_URL  }${SIGNUP_ENDPOINT}`;

// Auth API
const doCreateUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const doSignInWithEmailAndPassword = (email, password, remembered) => {
  return firebase
    .auth()
    .setPersistence(
      remembered
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION
    )
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    });
};

const doSignOut = () => {
  return firebase.auth().signOut();
};

const doPasswordReset = email => {
  return firebase.auth().sendPasswordResetEmail(email);
};

const doPasswordUpdate = password => {
  return firebase.auth().currentUser.updatePassword(password);
};

const doSendVerificationEmail = () => {
  return firebase.auth().currentUser.sendEmailVerification();
};

const getCurrentUserClaims = async () => {
  const tokenResult = await firebase.auth().currentUser.getIdTokenResult();
  return tokenResult.claims;
};

const createUserAccountFromSignup = async signupSubmission => {
  const response = await fetch(SIGN_UP_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupSubmission),
  });

  return response;
};

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doPasswordReset,
  doSendVerificationEmail,
  doPasswordUpdate,
  getCurrentUserClaims,
  createUserAccountFromSignup,
};

import * as firebase from 'firebase/app';
import 'firebase/auth';

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

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doPasswordReset,
  doSendVerificationEmail,
  doPasswordUpdate,
};

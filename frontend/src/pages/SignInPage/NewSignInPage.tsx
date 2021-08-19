import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import * as firebase from 'firebase/app';

import { SignInForm } from './components/SignInForm';

import * as ROUTES from '@Constants/routes';
import {
  doSignInWithEmailAndPassword,
  doSignOut,
  // doSendVerificationEmail,
  // doPasswordReset,
  getCurrentUserIDAndToken,
} from '@Services/auth';

export interface SignInValues {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

interface FirebaseUserInfo {
  userID: any;
  token: string;
}

interface SignInPageProps {
  setClaims: (userId: string) => Promise<void>;
}

export function SignInPage({ setClaims }: SignInPageProps): JSX.Element {
  const history = useHistory();
  const { search } = useLocation();

  const getPathToNav = () => {
    const { path } = queryString.parse(search);
    let pathToNavAfterLogin = ROUTES.HOME;

    if (path !== null) {
      if (path instanceof Array) {
        /*
         * Code to handle string array just because queryString.parse() return type is
         * a union type that includes string array
         */
        pathToNavAfterLogin = path.length > 0 ? path[0] : pathToNavAfterLogin;
      } else {
        pathToNavAfterLogin = path;
      }
    }

    return pathToNavAfterLogin;
  };

  const handleSubmit = async (
    { email, password, keepSignedIn }: SignInValues,
    setSubmitting: (_: boolean) => void
  ) => {
    let userClaims: FirebaseUserInfo = { userID: '', token: '' };

    try {
      await doSignInWithEmailAndPassword(email, password, keepSignedIn);
      userClaims = await getCurrentUserIDAndToken();

      const { userID } = userClaims;
      await setClaims(userID);

      if (firebase.auth().currentUser?.emailVerified) {
        history.push(getPathToNav());
      } else {
        await doSignOut();
      }
    } catch (error) {
      console.log(error);
      // Alert Modal set true here
    } finally {
      setSubmitting(false);
    }
  };

  return <SignInForm handleSubmit={handleSubmit} />;
}

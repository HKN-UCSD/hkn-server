import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

import * as ERR_MSG from '../constants/ErrResponses';


/*
  Create a new auth object for the provided email and password.
  Also links the auth account with existing user document and
  updates document with provided profile information.
  Prereqs:
    1.  Request body contains the following key value pairs:
        a. email
        b. password
        c. first_name
        d. last_name
        e. major
        f. grad_year
  Return: On successful account creation, user document is updated with incoming profile
          information and user auth account object is sent back mapped to newUser.
  Errors:`Can send back the following error responses: 400, 403, 500.
*/
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  // Grab form information from request body or if body is undefined,
  // parse from {}. (Helps avoid TypeError)
  const { email,
    password,
    first_name,
    last_name,
    major,
    graduation_year } = req.body || {};

  if (!validInput(email, password, first_name, last_name, major, graduation_year)) {
    // Invalid user information
    res.status(400).json({
      msg: ERR_MSG.GENERIC_400_MSG,
    });
    return next();
  }

  const userDocID = await getUserDocFromEmail(email);

  if (!userDocID) {
    // email is not whitelisted.
    res.status(403).json({
      msg: ERR_MSG.USER_NOT_WHITELISTED,
    });
    return next();
  }

  const newUser: admin.auth.UserRecord = await admin.auth().createUser({
    uid: userDocID,
    email: email,
    password: password
  })
    .then(userRec => {
      return userRec;
    })
    .catch(err => {
      if (typeof (err.code.includes) === 'function' && err.code.includes('exists')) {
        // Account already exists.
        res.status(403).json({
          msg: ERR_MSG.USER_ALREADY_EXISTS,
        });
        return undefined;
      }
      else {
        res.status(500).json({
          msg: ERR_MSG.FIREBASE_AUTH_CREATE_USER_ERR,
        });
        return undefined;
      }
    });

  if (!newUser) {
    return next();
  }

  await updateUserDoc(userDocID, {
    email: email,
    first_name: first_name,
    last_name: last_name,
    major: major,
    graduation_year: graduation_year,
  })
    .then(result => {
      res.status(200).json({
        userRecord: newUser,
      });
      return result;
    })
    .catch(err => {
      // Could not update the user document with provided data.
      // Delete account because we want to have this data in the user account at all times.
      admin.auth().deleteUser(userDocID)
        .then(res => {

          // BUG TODO - This is a consequence of having an auth onDelete firebase cloud function
          // which removes the user document thus also taking out that email from the whitelist
          // due to network problems.
          // This work-around basically repopulates the deleted document with the user email.
          admin.firestore()
            .collection('users')
            .doc(userDocID)
            .set({
              email: email,
            });
        });

      res.status(500).json({
        msg: ERR_MSG.FIRESTORE_UPDATE_DOC_ERR,
      });
      return undefined;
    });

  return next();
};

function validInput(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  major: string,
  grad_year: number
): boolean {
  // Add form input validation here.
  if (!email || !password || !first_name || !last_name || !major || !grad_year) {
    return false;
  }

  return true;
}

async function getUserDocFromEmail(email: string): Promise<string> {
  return admin.firestore().collection('users')
    .where('email', '==', email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return undefined;
      }

      return snapshot.docs[0].id;
    });
}

async function updateUserDoc(id: string, data: any) {
  return admin.firestore()
    .collection('users')
    .doc(id)
    .update(data);
}
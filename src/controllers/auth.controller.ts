import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { firebase as client } from '@firebase/app';

import * as ERR_MSG from '../constants/ErrResponses';

/*
  Create a new auth object for the provided email and password.
  Also links the auth account with existing user document and
  updates document with provided profile information.
  Prereqs:
    1.  Request body contains the following key value pairs:
        a. email
        b. password
        c. firstname
        d. lastname
        e. major
        f. gradYear
  Return: On successful account creation, user document is updated with incoming profile
          information and user auth account object is sent back mapped to newUser.
  Errors:`Can send back the following error responses: 400, 403, 500.
*/
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!validInput(req.body)) {
    // Invalid user information
    res.status(400).json({
      msg: ERR_MSG.GENERIC_400_MSG,
    });
    return next();
  }

  // Grab form information from request body
  const { email, password, firstname, lastname, major, gradYear } = req.body;

  const userDocDetails: any = await getUserDocFromEmail(email);

  if (!userDocDetails) {
    // email is not whitelisted.
    res.status(403).json({
      msg: ERR_MSG.USER_NOT_WHITELISTED,
    });
    return next();
  }

  const userDocID: string = userDocDetails.uid;

  let newUser: admin.auth.UserRecord;

  try {
    newUser = await admin.auth().createUser({
      uid: userDocID,
      email: email,
      password: password,
    });

    const updatedClaims: any = newUser.customClaims || {};
    console.log('Initial User claims:');
    console.log(newUser.customClaims);

    // claims are either 'member', 'inductee' or 'officer
    updatedClaims[userDocDetails.role.toLowerCase()] = true;
    console.log('Updated User Claims:');
    console.log(updatedClaims);
    await admin
      .auth()
      .setCustomUserClaims(userDocID, updatedClaims)
      .catch(console.log);
  } catch (err) {
    console.log('Error code: ' + err.code + '\tError Message: ' + err.message);
    if (
      err.code == 'auth/email-already-exists' ||
      err.code == 'auth/uid-already-exists'
    ) {
      // Account already exists.
      res.status(403).json({
        msg: ERR_MSG.USER_ALREADY_EXISTS,
      });
      return next();
    } else {
      res.status(500).json({
        msg: ERR_MSG.GENERIC_INTERNAL_ERROR,
      });
      return next();
    }
  }

  // if (!newUser) {
  //   return next();
  // }

  try {
    await updateDocInCollection('users', userDocID, {
      first_name: firstname,
      last_name: lastname,
      major: major,
      graduation_year: gradYear,
    });

    // Send verification email to user.
    await sendAccountVerificationEmail(email, password);

    res.status(200).json({
      userRecord: newUser,
    });

    return next();
  } catch (err) {
    console.log(err);
    // Could not update the user document with provided data.
    // Delete account because we want to have this data in the user account at all times.
    admin.auth().deleteUser(userDocID);

    res.status(500).json({
      msg: ERR_MSG.GENERIC_INTERNAL_ERROR,
    });
    return next();
  }
};

function validInput(body: any): boolean {
  // Grab form information from request body or if body is undefined,
  // parse from {}. (Helps avoid TypeError)
  const { email, password, firstname, lastname, major, gradYear } = body || {};

  // Add form input validation here.
  if (!email || !password || !firstname || !lastname || !major || !gradYear) {
    return false;
  }

  return true;
}

async function getUserDocFromEmail(email: string): Promise<any> {
  return admin
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return undefined;
      }
      const userData = snapshot.docs[0].data();
      userData.uid = snapshot.docs[0].id;
      return userData;
    });
}

async function updateDocInCollection(
  collection: string,
  id: string,
  data: any
) {
  return admin
    .firestore()
    .collection(collection)
    .doc(id)
    .update(data);
}

async function signInWithEmailAndPass(email: string, password: string) {
  await client.auth().signInWithEmailAndPassword(email, password);
}

async function signOut() {
  await client.auth().signOut();
}

async function sendAccountVerificationEmail(email: string, password: string) {
  await signInWithEmailAndPass(email, password);
  client.auth().currentUser.sendEmailVerification();
  await signOut();
}

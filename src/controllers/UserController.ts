import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { AppUser } from '@Entities';
import { plainToClass } from 'class-transformer';

// !!IMPORTANT!! this route shouldn't be exposed - here for migration purposes
// also missing induction class
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: AppUser = plainToClass(AppUser, req.body);
    const userWithID = await user.save();
    res.status(200).json(userWithID);
  } catch (err) {
    next(err);
  }
};

/* 
  Cloud function that adds a role for a user.
  { token, email, role } = req.body 
  Prereqs:
    1. Caller must be an officer in auth and Officer in docs
    2. User specified by 'email' must have a doc and be in auth
    3. Role must be in the database (case-sensitive)
*/
export const addRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const OFFICER = 'Officer';
  const { token, email, role } = req.body;

  const requesterClaims = await checkToken();

  // check if caller has officer token
  if (!(OFFICER in requesterClaims) || !requesterClaims.officer) {
    return next(new Error('Unauthorized Action: Only admins can add roles.'));
  }

  // get officer id from db
  const officer_id = await getIdFromRoles(OFFICER);
  if (officer_id == null) {
    return next(new Error("Not Found: Role '" + OFFICER + "' does not exist."));
  }

  // get caller doc
  const user_doc = await admin
    .firestore()
    .collection('users')
    .doc(requesterClaims.uid)
    .get();
  if (!user_doc.exists) {
    return next(new Error('Not Found: Could not find caller in database.'));
  }

  // check if caller doc has role of officer
  if (user_doc.get('role_id') !== officer_id) {
    return next(
      new Error('Unauthorized Action: Only admins in database can add roles.')
    );
  }

  // verified caller, find user
  const user = await getUser(email, next);

  // get newRole_id from db
  const new_role_id = await getIdFromRoles(role);
  if (new_role_id == null) {
    return next(new Error("Not Found: Role '" + role + "' does not exist."));
  }

  // check for user doc and set role
  try {
    await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({ role_id: new_role_id });
  } catch (err) {
    return next(new Error('Not Found: Could not find user in database.'));
  }

  // set claim for role and return
  await addCustomUserClaims(user, { [role]: true });
  res.status(200).json({ success: user.customClaims });
};

/* Get ID of role from database */
function getIdFromRoles(role: string) {
  return admin
    .firestore()
    .collection('roles')
    .where('value', '==', role)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        return null;
      }
      return querySnapshot.docs[0].id;
    });
}

/* 
  Cloud function that adds claims for a user.
  { token, email, claims } = req.body -> temporarily token is replaced with email of caller
  Prereqs:
    1. Caller must be an officer in claims
    2. User specified by 'email' must be in auth
*/
export const addClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, claims } = req.body;

  // Check that caller is an officer
  const requesterClaims = await checkToken();
  if (!('officer' in requesterClaims) || !requesterClaims.officer) {
    return next(new Error('Unauthorized Action: Only admins can add claims.'));
  }

  // Add claims
  const user = await getUser(email, next);
  await addCustomUserClaims(user, claims);
  res.status(200).json({ success: user.customClaims });
};

/* 
  Cloud function that removes claims for a user.
  { token, email, claims } = req.body -> temporarily token is replaced with email of caller
  Prereqs:
    1. Caller must be an officer in claims
    2. User specified by 'email' must be in auth
*/
export const removeClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token, email, claims } = req.body;

  // Check that caller is an officer
  const requesterClaims = await checkToken();
  if (!('officer' in requesterClaims) || !requesterClaims.officer) {
    return next(
      new Error('Unauthorized Action: Only admins can delete claims.')
    );
  }

  // Remove claims
  const user = await getUser(email, next);
  await removeCustomUserClaims(user, claims);
  res.status(200).json({ success: user.customClaims });
};

/* 
  Cloud function that gets claims for a specified user.
  { email } = req.body
  Prereqs:
    1. User specified by 'email' must be in auth
*/
export const viewClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const user = await getUser(email, next);
  res.status(200).json({ success: user });
};

/* 
  Updates the auto created claims within a person's token, such as email_verified.
  { email, claims } = req.body
  Prereqs:
    1. User specified by 'email' must be in auth
*/
export const updateClaim = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, claims } = req.body;
  const user = await getUser(email, next);
  await admin.auth().updateUser(user.uid, claims);
  res.status(200).json({ success: user.customClaims });
};

/*
  Checks that token exists. Otherwise, error.
*/
// async function checkToken(token: string, next: NextFunction) {
async function checkToken() {
  /*let requesterClaims = null;
  try {
    requesterClaims = await admin.auth().verifyIdToken(token);
  } catch (err) {
    return next(new Error('Invalid ID Token'));
  }*/

  // hardcoded requestClaims for testing
  const requesterClaims = {
    Officer: true,
    officer: true,
    iss: 'https://securetoken.google.com/hkn-member-portal-dev',
    aud: 'hkn-member-portal-dev',
    auth_time: 1585537672,
    user_id: 'CihJl3CrWE0FxO1FYyNI',
    sub: 'CihJl3CrWE0FxO1FYyNI',
    iat: 1585537672,
    exp: 1585541272,
    email: 'test@test.com',
    email_verified: true,
    firebase: {
      identities: { email: ['test@test.com'] },
      sign_in_provider: 'password',
    },
    uid: 'CihJl3CrWE0FxO1FYyNI',
  };

  return requesterClaims;
}

/* Helper function that gets the user from email in auth. */
async function getUser(
  email: string,
  next: NextFunction
): Promise<admin.auth.UserRecord> {
  let user = null;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (err) {
    next(new Error('Not Found: Could not find email in auth.'));
    return null;
  }
  return user;
}

/* Add custom claims.
Ex usage: await addCustomUserClaims(user, {field1: true, field2: "field2"});
*/
async function addCustomUserClaims(
  user: admin.auth.UserRecord,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  claims: any
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updated_claims: any = user.customClaims || {};

  for (const property in claims) {
    if (Object.prototype.hasOwnProperty.call(claims, property)) {
      updated_claims[property] = claims[property];
    }
  }
  await admin.auth().setCustomUserClaims(user.uid, updated_claims);
}

/* Remove fields/properties from a custom claim.
Ex usage: await removeCustomUserClaims(user, ["field1", "Inductee"]);
*/
async function removeCustomUserClaims(
  user: admin.auth.UserRecord,
  claims: string[]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updated_claims: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customClaims: any = user.customClaims;

  for (const property in customClaims) {
    if (!claims.includes(property)) {
      updated_claims[property] = customClaims[property];
    }
  }

  await admin.auth().setCustomUserClaims(user.uid, updated_claims);
}

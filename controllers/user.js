import admin from 'firebase-admin';

export const addClaim = async (req, res, next) => {
  const OFFICER = "Officer";
  const { token } = req.body;

  // get requesterClaims from token
  let requesterClaims = null;
  try {
    requesterClaims = await admin.auth().verifyIdToken(token);
  } catch (err) {
    return next(new Error('Invalid ID Token'));
  }

  // hardcoded requestClaims for testing
  /*let requesterClaims = {
    'Officer': true,
    'iss': 'https://securetoken.google.com/hkn-member-portal-dev',
    'aud': 'hkn-member-portal-dev',
    'auth_time': 1585537672,
    'user_id': 'CihJl3CrWE0FxO1FYyNI',
    'sub': 'CihJl3CrWE0FxO1FYyNI',
    'iat': 1585537672,
    'exp': 1585541272,
    'email': 'test@test.com',
    'email_verified': true,
    'firebase': {
      'identities': { 'email': ['test@test.com'] },
      'sign_in_provider': 'password'
    },
    'uid': 'CihJl3CrWE0FxO1FYyNI'
  };*/

  // check if caller has officer token
  if (!(OFFICER in requesterClaims) || !requesterClaims.Officer) {
    return next(new Error('Unauthorized Action: Only admins can add claims.'));
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
    return next(new Error('Unauthorized Action: Only admins in database can add claims.'));
  }

  // verified caller, find user
  const { email } = req.body;
  const { role } = req.body;

  // check if user exists in auth
  let user = null;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (err) {
    return next(new Error('Not Found: Could not find email in auth.'));
  }

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

  // set claim for role
  await addCustomUserClaims(user.uid, { [role]: true });

  // check custom claims
  let claims = (await admin.auth().getUser(user.uid)).customClaims;
  return res.status(200).json({ success: claims });
};

/* Get ID of role from database */
function getIdFromRoles(role) {
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

/* Add custom claims.
Ex usage: await addCustomUserClaims(user_uid, {field1: true, field2: "field2"});
*/
async function addCustomUserClaims(uid, claims) {
  const user = await admin.auth().getUser(uid);
  let updated_claims = user.customClaims || {};

  for (let property in claims) {
    if (Object.prototype.hasOwnProperty.call(claims, property)) {
      updated_claims[property] = claims[property];
    }
  }
  await admin.auth().setCustomUserClaims(uid, updated_claims)
}

/* Remove fields/properties from a custom claim.
Ex usage: await removeCustomUserClaims(user_uid, ["field1", "Inductee"]);
*/
async function removeCustomUserClaims(uid, claims) {
  const user = await admin.auth().getUser(uid);
  let updated_claims = {};

  for (let property in user.customClaims) {
    if (!(claims.includes(property))) {
      updated_claims[property] = user.customClaims[property];
    }
  }

  await admin.auth().setCustomUserClaims(uid, updated_claims)
}
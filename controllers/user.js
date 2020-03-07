import admin from 'firebase-admin';

export const addClaim = async (req, res) => {
  const { uid } = req.params;
  const { token } = req.body;

  let requesterClaims = null;
  try {
    requesterClaims = await admin.auth().verifyIdToken(token);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'Missing ID Token',
      err,
    });
    return;
  }
  res.status(200).send({
    token,
    requesterClaims,
  });
  return;

  // check if caller has officer token
  if (!('officer' in requesterClaims) || !requesterClaims.Officer) {
    res.status(403).send({
      error: 'Unauthorized Action: Only admins can add claims.',
    });
  }

  // get officer id from db
  const officer_id = getIdFromRoles('Officer');

  // check if caller doc has role of officer
  const user_doc = await admin
    .firestore()
    .collection('users')
    .doc(caller_uid)
    .get();

  // TODO after here

  if (user_doc.get('role_id') !== officer_id) {
    res.status(403).send({
      error: 'Unauthorized Action: Only admins can add claims.',
    });
  }

  // verified caller, find user
  const email = data.email;
  const role = data.role;

  // check if user exists in auth
  const user = await admin.auth().getUserByEmail(email);
  const user_uid = user.uid;

  // get role_id from db
  const roleID = await getIdFromRoles(role);

  // check for user doc and set role
  await admin
    .firestore()
    .collection('users')
    .doc(user_uid)
    .update({ role_id: roleID })
    .catch(err => {
      throw new functions.https.HttpsError(err.code, err.details);
    });

  // set claim for role
  await admin
    .auth()
    .setCustomUserClaims(user.uid, { [role]: true })
    .catch(err => {
      throw new functions.https.HttpsError(err.code, err.details);
    });

  return { success: true };
};

function getIdFromRoles(role) {
  return admin
    .firestore()
    .collection('roles')
    .where('value', '==', role)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        throw new functions.https.HttpsError(
          'not-found',
          'Role ' + role + ' does not exist.'
        );
      }
      return querySnapshot.docs[0].id;
    });
}

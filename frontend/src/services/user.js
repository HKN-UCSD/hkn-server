import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// User

const getRoleFromID = roleID => {
  return firebase
    .firestore()
    .collection('roles')
    .doc(roleID)
    .get()
    .then(docSnapshot => {
      if (!docSnapshot.exists) {
        throw Error('Role document does not exist.');
      }

      return docSnapshot.data();
    })
    .then(data => {
      if (!data.value) {
        throw Error('Name of role does not exist.');
      }
      return data.value;
    })
    .catch(error => {
      throw Error(`Query for role from ID failed: ${error}`);
    });
};

const getUserDocument = uid => {
  return firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(snapshot => {
      return {
        uid,
        ...snapshot.data(),
      };
    })
    .catch(() => {
      throw Error('User Doc Query failed.');
    });
};

const getCurrentUserDocument = () => {
  return getUserDocument(firebase.auth().currentUser.uid);
};

const getUserRoleID = () => {
  return getCurrentUserDocument()
    .then(data => {
      if (!data.role_id) {
        throw Error('Role ID of user does not exist.');
      }
      // console.log("**Role Id for current user: "+data.role_id)
      return data.role_id;
    })
    .catch(error => {
      throw Error(`Query for ID of user role failed: ${error}`);
    });
};

const queryCurrentUserRole = () => {
  return getUserRoleID()
    .then(roleID => {
      return getRoleFromID(roleID);
    })
    .catch(error => {
      throw Error(`Query for current user role failed: ${error}`);
    });
};

export {
  getRoleFromID,
  getCurrentUserDocument,
  getUserRoleID,
  queryCurrentUserRole,
};

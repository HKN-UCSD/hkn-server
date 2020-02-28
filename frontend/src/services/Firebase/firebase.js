import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import firebase from '@firebase/app';

// Initialize Firebase
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.storage = app.storage();
    // console.log(this.storage)

    this.db = app.firestore();
    this.db.enablePersistence().catch(err => {
      console.log(err);
      // Just don't cache. Catching error to ensure that it doesn't propagate out.
    });
    // this.db.settings({timestampsInSnapshots: true})
  }

  // Auth API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password, remembered) =>
    this.auth
      .setPersistence(
        remembered
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION
      )
      .then(() => {
        return this.auth.signInWithEmailAndPassword(email, password);
      });

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendVerificationEmail = () => this.auth.currentUser.sendEmailVerification();

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // User
  user = uid => this.db.collection('users').doc(uid);

  // get inductee users for total point list
  getInducteesInfo = () => {
    // console.log("get info for all the inductee users")

    return this.getIdFromRoles('Inductee').then(data => {
      return this.db
        .collection('users')
        .where('role_id', '==', data)
        .get();
    });
    // return this.db.collection('users').where("role_id", "==", "a1G5wSOZj20lDegYgZ7j").get()
  };

  getIdFromRoles = role => {
    return this.db
      .collection('roles')
      .where('value', '==', role)
      .get()
      .then(docSnapshot => {
        // console.log("len(docSnapshot): "+docSnapshot.docs.length)
        if (docSnapshot.docs.empty) {
          throw Error(`Role ${role} does not exist.`);
        }
        // console.log("**docSnashot.id: "+docSnapshot.docs[0].id)
        return docSnapshot.docs[0].id;
      });
  };

  getRoleFromID = roleID => {
    return this.db
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
        console.log(`ERROR: ${error}`);
      });
  };

  getUserRoleID = () => {
    return this.getUserDocument()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          throw Error('User document does not exist.');
        }

        return docSnapshot.data();
      })
      .then(data => {
        if (!data.role_id) {
          throw Error('Role ID of user does not exist.');
        }
        // console.log("**Role Id for current user: "+data.role_id)
        return data.role_id;
      })
      .catch(error => {
        console.log(`ERROR:${error}`);
      });
  };

  queryCurrentUserRole = () => {
    return this.getUserRoleID()
      .then(roleID => {
        return this.getRoleFromID(roleID);
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
  };

  // get events for queried user
  getUserEvent = userId => {
    // console.log("get events for "+userId+" :")
    return this.db
      .collection('pointReward')
      .where('user_id', '==', userId)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
      })
      .catch(() => {
        throw Error('Points Query failed.');
      });
  };

  // Firestore
  updateResumeFields = (filename, timestamp, downloadURL) => {
    return this.db
      .collection('users')
      .doc(this.auth.currentUser.uid)
      .update({
        resumeUploadTimestamp: timestamp,
        resumeFilename: filename,
        resumeDownloadURL: downloadURL,
      });
  };

  getUserDocument = () => {
    return this.db
      .collection('users')
      .doc(this.auth.currentUser.uid)
      .get();
  };

  getPoints = () => {
    const eventPoints = this.db.collection('pointReward');
    if (this.auth.currentUser) {
      return eventPoints
        .where('user_id', '==', this.auth.currentUser.uid)
        .get()
        .catch(() => {
          throw Error('Points Query failed.');
        });
    }

    throw Error('Points Query failed.');
  };

  getEnumMap = collection => {
    return this.db
      .collection(collection)
      .get()
      .then(snapshot => {
        if (!snapshot) {
          throw Error('Enum Map query failed');
        }
        const enumMap = {};
        snapshot.docs.forEach(doc => {
          enumMap[doc.get('value')] = doc.id;
        });
        return enumMap;
      })
      .catch(() => {
        throw Error('Enum Map query failed');
      });
  };

  getUserRoleID = () => {
    return this.getUserDocument()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          throw Error('User document does not exist.');
        }

        return docSnapshot.data();
      })
      .then(data => {
        if (!data.role_id) {
          throw Error('Role ID of user does not exist.');
        }

        return data.role_id;
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
  };

  getRoleFromID = roleID => {
    return this.db
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
        console.log(`ERROR: ${error}`);
      });
  };

  queryCurrentUserRole = () => {
    return this.getUserRoleID()
      .then(roleID => {
        if (roleID === null || roleID === undefined) {
          throw Error('User does not have Role');
        }
        return this.getRoleFromID(roleID);
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
  };

  removeResumeFields = () =>
    this.db
      .collection('users')
      .doc(this.auth.currentUser.uid)
      .update({
        resumeFilename: firebase.firestore.FieldValue.delete(),
        resumeUploadTimestamp: firebase.firestore.FieldValue.delete(),
        resumeDownloadURL: firebase.firestore.FieldValue.delete(),
      });

  // Storage
  uploadResume = resumeFile => {
    return this.storage
      .ref()
      .child('users')
      .child(this.auth.currentUser.uid)
      .child('resume')
      .child(resumeFile.name)
      .put(resumeFile);
  };

  deleteResume = resumeFilename =>
    this.storage
      .ref()
      .child('users')
      .child(this.auth.currentUser.uid)
      .child('resume')
      .child(resumeFilename)
      .delete();
}

export default Firebase;

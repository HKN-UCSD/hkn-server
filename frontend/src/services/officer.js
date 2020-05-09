import * as firebase from 'firebase/app';
import 'firebase/firestore';

const getIdFromRoles = role => {
  return firebase
    .firestore()
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

// get inductee users for total point list
const getInducteesInfo = () => {
  // console.log("get info for all the inductee users")

  return getIdFromRoles('Inductee').then(data => {
    return firebase
      .firestore()
      .collection('users')
      .where('role_id', '==', data)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      })
      .catch(() => {
        throw Error('Inductee Info Query failed.');
      });
  });
  // return this.db.collection('users').where("role_id", "==", "a1G5wSOZj20lDegYgZ7j").get()
};

export { getIdFromRoles, getInducteesInfo };

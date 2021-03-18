import * as firebase from 'firebase/app';
import 'firebase/firestore';

// get inductee users for total point list
const getInducteesInfo = () => {
  // console.log("get info for all the inductee users")

  return firebase
    .firestore()
    .collection('users')
    .where('role', '==', 'Inductee')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
    })
    .catch(err => {
      throw Error(err);
    });
  // return this.db.collection('users').where("role_id", "==", "a1G5wSOZj20lDegYgZ7j").get()
};

export default getInducteesInfo;

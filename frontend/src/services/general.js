import * as firebase from 'firebase/app';
import 'firebase/firestore';

const getEnumMap = collection => {
  return firebase
    .firestore()
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

export default getEnumMap;

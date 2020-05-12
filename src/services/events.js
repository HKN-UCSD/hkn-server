import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// get events for queried user
const getUserEvent = userId =>
{
  // console.log("get events for "+userId+" :")
  return firebase
    .firestore()
    .collection('pointReward')
    .where('user_id', '==', userId)
    .get()
    .then(querySnapshot =>
    {
      return querySnapshot.docs.map(doc => doc.data());
    })
    .catch(() =>
    {
      throw Error('Points Query failed.');
    });
};

const getPoints = () =>
{
  const eventPoints = firebase.firestore().collection('pointReward');
  if (firebase.auth().currentUser) {
    return eventPoints
      .where('user_id', '==', firebase.auth().currentUser.uid)
      .get()
      .then(snapshot =>
      {
        return snapshot.docs.map(doc => doc.data());
      })
      .catch(() =>
      {
        throw Error('Points Query failed.');
      });
  }

  throw Error('Points Query failed, userId invalid');
};

const getEventById = eventId =>
{
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .get()
    .then(documentSnapshot =>
    {
      return documentSnapshot.data();
    })
    .catch(() =>
    {
      throw Error('Query for event by ID has failed.');
    });
}

export { getUserEvent, getPoints, getEventById };

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// get events for queried user
const getUserEvent = userId => {
  // console.log("get events for "+userId+" :")
  return firebase
    .firestore()
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

const getPoints = () => {
  const eventPoints = firebase.firestore().collection('pointReward');
  if (firebase.auth().currentUser) {
    return eventPoints
      .where('user_id', '==', firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data());
      })
      .catch(() => {
        throw Error('Points Query failed.');
      });
  }

  throw Error('Points Query failed, userId invalid');
};

const getEventById = eventId => {
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .get()
    .then(querySnapshot => {
      return querySnapshot.data();
    })
    .catch(() => {
      throw Error('Event Detail Query failed.');
    });
};

const setEventDetails = (eventId, eventDetails) => {
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .set(eventDetails);
};

const timestampToDate = timestamp => {
  return timestamp.toDate();
};

const dateToTimestamp = date => {
  return firebase.firestore.Timestamp.fromDate(date);
};

const deleteEventById = eventId => {
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .delete()
    .then(res => {
      return res;
    })
    .catch(() => {
      throw Error('Deletion of event by ID has failed.');
    });
};

export {
  getUserEvent,
  getPoints,
  getEventById,
  deleteEventById,
  setEventDetails,
  timestampToDate,
  dateToTimestamp,
};

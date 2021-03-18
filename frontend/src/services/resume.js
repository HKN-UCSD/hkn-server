import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const updateResumeFields = (filename, timestamp, downloadURL) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({
      resumeUploadTimestamp: timestamp,
      resumeFilename: filename,
      resumeDownloadURL: downloadURL,
    });
};

const removeResumeFields = () => {
  return firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .update({
      resumeFilename: firebase.firestore.FieldValue.delete(),
      resumeUploadTimestamp: firebase.firestore.FieldValue.delete(),
      resumeDownloadURL: firebase.firestore.FieldValue.delete(),
    });
};

// Storage
const uploadResume = resumeFile => {
  return firebase
    .storage()
    .ref()
    .child('users')
    .child(firebase.auth().currentUser.uid)
    .child('resume')
    .child(resumeFile.name)
    .put(resumeFile);
};

const getDownload = path => {
  return firebase
    .storage()
    .ref(path)
    .getDownloadURL();
};

const deleteResume = resumeFilename => {
  return firebase
    .storage()
    .ref()
    .child('users')
    .child(firebase.auth().currentUser.uid)
    .child('resume')
    .child(resumeFilename)
    .delete();
};

export {
  updateResumeFields,
  removeResumeFields,
  uploadResume,
  getDownload,
  deleteResume,
};

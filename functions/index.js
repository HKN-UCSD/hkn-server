const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

exports.onCreateUser = functions.auth.user().onCreate((user) => {
    return db.collection('whitelists').doc('members').get()
        .then(docSnapshot => {
            emails = docSnapshot.data()
            if (emails[user.email] === true) {
                console.log('Set member privilege')
                return admin.auth().setCustomUserClaims(user.uid, {member: true})
            } else {
                console.log('Deleted an user based on the whitelist')
                return admin.auth().deleteUser(user.uid)                
            }
        })
        .then(() => {
            return db.collection('users').doc(user.uid).set({email : user.email})
        })
        .catch(error => {
            console.log(error)
        })
});

exports.onDeleteUser = functions.auth.user().onDelete((user) => {
    return db.collection('users').doc(user.uid).delete()
        .then(() => {
            console.log("Successfully removed user's data.");
        })
        .catch(error => {
            console.log(error);
        })
});
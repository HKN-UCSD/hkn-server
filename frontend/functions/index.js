const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// const fs = require('fs');
// const csv = require('csv');

exports.onCreateUser = functions.auth.user().onCreate((user) => {
    return db.collection('whitelists').doc('members').get()
        .then(docSnapshot => {
            const emails = docSnapshot.data()
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

// exports.onCreateUser = functions.auth.user().onCreate((user) => {
//     const readStream = fs.createReadStream('./members-list.csv');
//     const parser = csv.parse({ columns: true });
//     var memberRecord = null;

//     parser.on('readable', () => {
//         let record
//         while (record = parser.read() && memberRecord === null) {
//             if (record['UCSD Email'] === user.email) {
//                 memberRecord = record
//             }
//         }
//     });

//     parser.on('error', (error) => {
//         console.log(error.message);
//     });

//     parser.on('finish', () => { 
//         if (memberRecord === null) {
//             return admin.auth().deleteUser(user.uid)
//             .catch(error => {
//                 console.log(error)
//             })
//         } else {
//             return admin.auth().setCustomUserClaims(user.uid, {member: true})
//             .then(() => {
//                 return db.collection('users').doc(user.uid).set({
//                     email : user.email,
//                     firstName : memberRecord['First Name'],
//                     lastName : memberRecord['Last Name'],
//                     class : memberRecord['Class']
//                 })
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//         }
//     });

//     readStream.pipe(parser);
// });

exports.onDeleteUser = functions.auth.user().onDelete((user) => {
    return db.collection('users').doc(user.uid).delete()
        .then(() => {
            console.log("Successfully removed user's data.");
        })
        .catch(error => {
            console.log(error);
        })
});
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
        app.initializeApp(config)

        this.auth = app.auth()
        this.db = app.firestore()
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)

    doSendVerificationEmail = () =>
        this.auth.currentUser.sendEmailVerification()

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)

    isEmailVerified = () =>
        this.auth.currentUser.emailVerified

    // User API
    user = uid => this.db.collection('users').doc(uid)

    // Firestore API
    isMember = email => 
        this.db.collection('membersList').doc(email).get().then(docSnapshot => docSnapshot.exists)
}

export default Firebase
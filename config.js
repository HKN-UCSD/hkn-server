let FirebaseConfig = {};
let FirebaseURL = '';

// if (process.env.NODE_ENV === 'development') {
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_DATABASE_URL,
} = process.env;
FirebaseConfig['project_id'] = FIREBASE_PROJECT_ID;
FirebaseConfig['clientEmail'] = FIREBASE_CLIENT_EMAIL;
FirebaseConfig['privateKey'] = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
FirebaseURL = FIREBASE_DATABASE_URL;
// }

const Config = {
  FirebaseConfig,
  FirebaseURL,
};

export default Config;

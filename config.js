import dotenv from 'dotenv';

dotenv.config();

const FirebaseConfig = {};

if (process.env.NODE_ENV === 'development') {
  const {
    FIREBASE_API_KEY,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
  } = process.env;
  FirebaseConfig[apiKey] = FIREBASE_API_KEY;
  FirebaseConfig[databaseURL] = FIREBASE_DATABASE_URL;
  FirebaseConfig[projectId] = FIREBASE_PROJECT_ID;
}

const Config = {
  FirebaseConfig,
};

export default Config;

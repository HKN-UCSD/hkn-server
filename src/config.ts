import dotenv from 'dotenv';

// Load env vars using dotenv only if in development mode.
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

type FirebaseConfig = {
  project_id: string;
  clientEmail: string;
  privateKey: string;
};

type Config = {
  firebaseConfig: FirebaseConfig;
  dbURL: string;
};

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_DATABASE_URL,
} = process.env;

const firebaseConfig: FirebaseConfig = {
  project_id: FIREBASE_PROJECT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

export const config: Config = {
  firebaseConfig: firebaseConfig,
  dbURL: FIREBASE_DATABASE_URL,
};

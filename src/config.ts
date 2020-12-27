type FirebaseConfig = {
  project_id: string;
  clientEmail: string;
  privateKey: string;
};

type Config = {
  firebaseConfig: FirebaseConfig;
  dbURL: string;
  clientAppID: string;
  clientApiKey: string;
  devAuth: boolean;
  ddMetricTag: string;
  nodeEnv: string;
};

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_DATABASE_URL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_API_KEY,
  DEV_AUTH,
  DD_METRIC_TAG,
  NODE_ENV,
} = process.env;

const firebaseConfig: FirebaseConfig = {
  project_id: FIREBASE_PROJECT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

export const config: Config = {
  firebaseConfig: firebaseConfig,
  dbURL: FIREBASE_DATABASE_URL,
  clientAppID: FIREBASE_CLIENT_ID,
  clientApiKey: FIREBASE_CLIENT_API_KEY,
  devAuth: DEV_AUTH === 'true',
  ddMetricTag: DD_METRIC_TAG,
  nodeEnv: NODE_ENV,
};

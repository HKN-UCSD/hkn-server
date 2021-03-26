type Config = {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectID?: string;
  storageBucket?: string;
  messagingSenderID?: string;
  appID?: string;
  apiURL?: string;
  nodeEnv?: string;
};

export const config: Config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectID: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderID: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID: process.env.REACT_APP_APP_ID,
  apiURL: process.env.REACT_APP_API_URL,
  nodeEnv: process.env.NODE_ENV,
};

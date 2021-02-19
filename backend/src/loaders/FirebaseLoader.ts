import admin from 'firebase-admin';
import { firebase as client } from '@firebase/app';
import { config } from '../config';

export function loadFirebase(): void {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebaseConfig),
    databaseURL: config.dbURL,
  });

  client.initializeApp({
    apiKey: config.clientApiKey,
    projectId: config.firebaseConfig.project_id,
    appId: config.clientAppID,
  });
}

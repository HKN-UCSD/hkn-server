import express from 'express';
import cors from 'cors';
import 'express-rate-limit';

import admin from 'firebase-admin';
import { firebase as client } from '@firebase/app';
import '@firebase/auth';

import { config } from './config';
import { UserRouter } from './routers/user.router';
import { DocsRouter } from './routers/docs.router';
import { AuthRouter } from './routers/auth.router';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TIMEFRAME, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_CONNS, 10),
});

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseConfig),
  databaseURL: config.dbURL,
});

client.initializeApp({
  apiKey: config.clientApiKey,
  projectId: config.firebaseConfig.project_id,
  appId: config.clientAppID,
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/api/user', UserRouter);
app.use('/docs', DocsRouter);
app.use('/api/auth', AuthRouter);

app.listen(port);

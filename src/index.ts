import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { firebase as client } from '@firebase/app';
import '@firebase/auth';
import { config } from './config';
import { UserRouter } from './routers/user.router';
import { DocsRouter } from './routers/docs.router';
import { AuthRouter } from './routers/auth.router';
import ValidationMiddleware from './middlewares/validation/base/validation.middleware';
import Joi from '@hapi/joi';

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

app.use('/api/user', UserRouter);
app.use('/docs', DocsRouter);
app.use('/api/auth', AuthRouter);

const schema = Joi.object({
  someText: Joi.string().required(),
  someNumber: Joi.number()
    .integer()
    .required(),
});

app.post('/', ValidationMiddleware(schema), (req, res) => {
  console.log('Success!');
  res.json({
    Success: 'Success!',
  });
});

app.listen(port);

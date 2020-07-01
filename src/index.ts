import express from 'express';
import admin from 'firebase-admin';
import { config } from './config';
import { UserRouter } from './routers/user.router';
import { DocsRouter } from './routers/docs.router';
import { AuthRouter } from './routers/auth.router';

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseConfig),
  databaseURL: config.dbURL,
});

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);
app.use('/docs', DocsRouter);
app.use('/api/auth', AuthRouter);

app.listen(port);

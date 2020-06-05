import express from 'express';
import admin from 'firebase-admin';
import Config from '../config.js';
import UserRouter from '../routes/user.js';

admin.initializeApp({
  credential: admin.credential.cert(Config.FirebaseConfig),
  databaseURL: Config.FirebaseURL,
});

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);

app.listen(port, () => {});

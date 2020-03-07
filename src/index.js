import express from 'express';
import admin from 'firebase-admin';
import Config from '../config.js';
import UserRouter from '../routes/user.js';

admin.initializeApp(Config.FirebaseConfig);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);

app.listen(port, () => {
  console.log('API is running on port 3000.');
});

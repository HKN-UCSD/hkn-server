import 'reflect-metadata'; // shim required for routing-controllers
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'reflect-metadata'; // required for class-transformer to work
import admin from 'firebase-admin';
import { firebase as client } from '@firebase/app';
import '@firebase/auth';

import { config } from './config';
import { UserRouter } from './routers/user.router';
import { DocsRouter } from './routers/docs.router';
import { AuthRouter } from './routers/auth.router';
// import { EventRouter } from './routers/event.router';
import { createConnection } from 'typeorm';
import { InductionClassRouter } from './routers/induction-class.router';

import { createExpressServer } from 'routing-controllers';
import { EventController } from './controllers/event.controller';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';

import ErrorHandler from './middlewares/errorHandler/errorHandler.middleware';

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TIMEFRAME, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
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

// cxn created via configs from ormconfig.ts
createConnection()
  .then(_ => {
    // magic happens here
    // <-------------->
    routingUseContainer(Container);
    const app = createExpressServer({
      cors: true,
      controllers: [EventController],
    });
    // <-------------->

    const port = process.env.PORT || 3001;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(limiter);
    app.use(ErrorHandler);

    app.use('/docs', DocsRouter);
    app.use('/api/user', UserRouter);
    app.use('/api/auth', AuthRouter);
    app.use('/api/induction-class', InductionClassRouter);

    app.listen(port);
  })
  .catch(error => console.log(error));

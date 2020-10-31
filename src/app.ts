import 'reflect-metadata'; // shim required for routing-controllers
import 'module-alias/register'; // required for aliases
import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import { UserRouter } from './routers/UserRouter';
import { DocsRouter } from './routers/DocsRouter';
import { AuthRouter } from './routers/AuthRouter';

import { useExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { controllers, ControllerContainer } from './controllers';

import { loadFirebase, loadORM } from './loaders';
import morgan from 'morgan';

import { checkCurrentUserToken } from './decorators';

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TIMEFRAME, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
});

export const getExpressApp = async () => {
  const connection = await loadORM();
  loadFirebase();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  app.use(limiter);

  // load controllers; maybe move into loader?

  // tell routing-controllers to use typedi container
  routingUseContainer(ControllerContainer);
  useExpressServer(app, {
    cors: true,
    controllers: controllers,
    currentUserChecker: checkCurrentUserToken,
  });

  app.use(compression());

  app.use('/api/docs', DocsRouter);

  // following two routers will be deprecated and moved into
  // routing-controllers
  //app.use('/api/user', UserRouter);
  //app.use('/api/auth', AuthRouter);

  return { app, connection };
};

import 'reflect-metadata'; // shim required for routing-controllers
import 'module-alias/register'; // required for aliases
import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import connect_datadog from 'connect-datadog';

import { DocsRouter } from './routers/DocsRouter';

import { useExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { controllers, ControllerContainer } from './controllers';

import { loadFirebase, loadORM } from './loaders';
import { config } from './config';
import morgan from 'morgan';

import { checkCurrentUserToken } from './decorators';

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
  if (config.nodeEnv !== 'development') {
    app.use(
      connect_datadog({
        method: true,
        response_code: true,
        tags: [config.ddMetricTag],
      })
    );
  }

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

  return { app, connection };
};

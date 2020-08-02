import 'reflect-metadata'; // shim required for routing-controllers
import 'module-alias/register'; // required for aliases
import express from 'express';
import rateLimit from 'express-rate-limit';

import { UserRouter } from './routers/UserRouter';
import { DocsRouter } from './routers/DocsRouter';
import { AuthRouter } from './routers/AuthRouter';

import { useExpressServer } from 'routing-controllers';
import { Controllers } from './controllers';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { loadServices, loadFirebase, loadORM } from './loaders';

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TIMEFRAME, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
});
const port = process.env.PORT || 3001;

loadORM().then(() => {
  loadServices();
  loadFirebase();

  const app = express();

  // initialize global middlewares to be used before
  // all controllers
  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // load controllers
  // tell routing-controllers to use typedi container
  routingUseContainer(Container);
  useExpressServer(app, {
    cors: true,
    controllers: Controllers,
  });

  app.use('/api/docs', DocsRouter);

  // following two routers will be deprecated and moved into
  // routing-controllers
  app.use('/api/user', UserRouter);
  app.use('/api/auth', AuthRouter);

  app.listen(port);
});

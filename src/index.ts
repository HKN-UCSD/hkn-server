import 'reflect-metadata'; // shim required for routing-controllers
import 'module-alias/register'; // required for aliases
import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import { UserRouter } from './routers/UserRouter';
import { DocsRouter } from './routers/DocsRouter';
import { AuthRouter } from './routers/AuthRouter';

import { useExpressServer } from 'routing-controllers';
import { Controllers } from './controllers';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { container } from 'tsyringe';

import { loadServices, loadFirebase, loadORM } from './loaders';
import morgan from 'morgan';

import { checkCurrentUserToken } from './decorators';

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_TIMEFRAME, 10),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
});
const port = process.env.PORT || 3001;

loadServices();

// DB connection
loadORM().then(() => {
  loadFirebase();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  app.use(limiter);

  // load controllers; maybe move into loader?

  // tell routing-controllers to use typedi container
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerShim = { get: (someClass: any) => container.resolve(someClass) as any };
  routingUseContainer(containerShim);
  useExpressServer(app, {
    cors: true,
    controllers: Controllers,
    currentUserChecker: checkCurrentUserToken,
  });

  app.use(compression());

  app.use('/api/docs', DocsRouter);

  // following two routers will be deprecated and moved into
  // routing-controllers
  app.use('/api/user', UserRouter);
  app.use('/api/auth', AuthRouter);

  app.listen(port);
});

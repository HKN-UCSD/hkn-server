import express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'HKN API ',
      version: '1.0.0',
      description: 'HKN API',
    },
  },
  apis: ['./src/routers/*.ts'],
};

const swaggerSpec = swaggerJSDoc.default(options);

export const DocsRouter = express.Router();

DocsRouter.use('/', swaggerUI.serve);
DocsRouter.get('/', swaggerUI.setup(swaggerSpec));

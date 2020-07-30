import express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { Controllers } from '../controllers';

const rcOptions = {
  controllers: Controllers,
};

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas',
});

const rcMetadataStorage = getMetadataArgsStorage();
const openAPISpec = routingControllersToSpec(rcMetadataStorage, rcOptions, {
  components: {
    schemas,
  },
  info: {
    title: 'HKN API ',
    version: '1.0.0',
    description: 'HKN API',
  },
});

export const DocsRouter = express.Router();

DocsRouter.use('/', swaggerUI.serve);
DocsRouter.get('/', swaggerUI.setup(openAPISpec));

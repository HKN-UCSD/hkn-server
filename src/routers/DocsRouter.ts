import express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { defaultMetadataStorage } from 'class-transformer/storage';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec, OpenAPI } from 'routing-controllers-openapi';
import { classToPlain } from 'class-transformer';
import { Controllers } from '../controllers';

const rcOptions = {
  controllers: Controllers,
};

// https://github.com/epiphone/class-validator-jsonschema#validatenested-and-arrays
const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
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
DocsRouter.get('/json', (req, res) => {
  res.status(200).json(classToPlain(openAPISpec));
});

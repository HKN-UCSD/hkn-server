import express from 'express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { defaultMetadataStorage } from 'class-transformer/storage';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { classToPlain } from 'class-transformer';
import { Controllers } from '../controllers';
import redoc from 'redoc-express';

// TODO move this into a constants folder or config or sth
const SecuritySchemeName = 'TokenAuth';

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

openAPISpec.components.securitySchemes = {};
openAPISpec.components.securitySchemes[SecuritySchemeName] = {
  type: 'http',
  scheme: 'bearer',
};

export const DocsRouter = express.Router();

DocsRouter.get(
  '/',
  redoc({
    title: 'HKN API',
    specUrl: '/api/docs/json',
  })
);
DocsRouter.get('/json', (req, res) => {
  res.status(200).json(classToPlain(openAPISpec));
});

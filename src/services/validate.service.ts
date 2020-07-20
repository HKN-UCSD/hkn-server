import Joi from '@hapi/joi';
import * as ERROR_MSG from '../constants/ErrResponses';

const validateWithJoi = async (
  data: Joi.SchemaLike,
  schema: Joi.Schema,
  validationOptions: Joi.ValidationOptions
): Promise<void> => {
  try {
    await schema.validateAsync(data, validationOptions);
  } catch {
    throw new Error(ERROR_MSG.INVALID_REQUEST_BODY);
  }
};

export { validateWithJoi };

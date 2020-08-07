import Joi from '@hapi/joi';
import * as ERROR_MSG from '../constants/ErrResponses';

const validateWithJoi = async (
  data: Joi.SchemaLike,
  schema: Joi.Schema,
  validationOptions: Joi.ValidationOptions
): Promise<void> => {
  try {
    await schema.validateAsync(data, validationOptions);
  } catch (err) {
    const { details } = err;
    const errMsgArray = details.map((errObj: Joi.ValidationErrorItem) => errObj.message);

    throw ERROR_MSG.INVALID_REQUEST_BODY(errMsgArray);
  }
};

export { validateWithJoi };

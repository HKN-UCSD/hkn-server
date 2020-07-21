import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { validateWithJoi } from '../../../services/validate.service';

const ValidationMiddleware = (
  schema: Joi.Schema,
  validationOptions: Joi.ValidationOptions = {}
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await validateWithJoi(req.body, schema, validationOptions);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default ValidationMiddleware;

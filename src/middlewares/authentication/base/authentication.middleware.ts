import { Request, Response, NextFunction } from 'express';
import { verifyRole } from '../../../services/AuthService';

import * as ERROR_MSG from '../../../constants/ErrResponses';

const AuthMiddleware = (permittedRoles: Array<string>) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.body;

  try {
    const isVerified = await verifyRole(token, permittedRoles);

    if (isVerified) {
      return next();
    } else {
      return next(ERROR_MSG.USER_NOT_AUTHORIZED);
    }
  } catch (err) {
    return next(err);
  }
};

export default AuthMiddleware;

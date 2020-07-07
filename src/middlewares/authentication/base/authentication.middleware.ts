import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

import * as ERROR_MSG from '../../../constants/authErrorMessages';

const AuthMiddleware = (permittedRoles: Array<String>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;

  admin
    .auth()
    .verifyIdToken(token)
    .then(claims => {
      const claimsKeyArr = Object.keys(claims);

      if (claims != null) {
        for (let i = 0; i < claimsKeyArr.length; i += 1) {
          if (permittedRoles.includes(claimsKeyArr[i])) {
            return next();
          }
        }

        return next(new Error(ERROR_MSG.NO_PERMITTED_ROLES));
      }
    })
    .catch(err => {
      return next(err);
    });
};

export default AuthMiddleware;

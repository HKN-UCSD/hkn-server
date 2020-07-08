import admin from 'firebase-admin';
import { NextFunction } from 'express';

import * as ERROR_MSG from '../constants/authErrorMessages';

const verifyRole = async (
  token: string,
  permittedRoles: Array<string>,
  next: NextFunction
) => {
  try {
    const claims = await admin.auth().verifyIdToken(token);
    const claimsKeyArr = Object.keys(claims);

    if (claims != null) {
      for (let i = 0; i < claimsKeyArr.length; i += 1) {
        if (permittedRoles.includes(claimsKeyArr[i])) {
          return next();
        }
      }

      return next(new Error(ERROR_MSG.NO_PERMITTED_ROLES));
    }
  } catch (err) {
    return next(err);
  }
};

export { verifyRole };

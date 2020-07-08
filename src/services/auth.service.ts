import admin from 'firebase-admin';
import * as ERROR_MSG from '../constants/authErrorMessages';

const verifyRole = async (token: string, permittedRoles: Array<string>) => {
  try {
    const claims = await admin.auth().verifyIdToken(token);
    const claimsKeyArr = Object.keys(claims);

    if (claims != null) {
      for (let i = 0; i < claimsKeyArr.length; i += 1) {
        if (permittedRoles.includes(claimsKeyArr[i])) {
          return true;
        }
      }

      return false;
    }
  } catch (err) {
    throw new Error(ERROR_MSG.USER_NOT_AUTHENTICATED);
  }
};

export { verifyRole };

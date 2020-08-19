import { ForbiddenError, UnauthorizedError } from 'routing-controllers';

import { AuthorizationService, AuthenticationService } from '@Services';
import * as ERR_MSGS from '../../constants/ErrResponses';

export const AuthorizationMiddleware = (
  authenticationService: AuthenticationService,
  authorizationService: AuthorizationService,
  permittedRoles: Array<string>
) => async (request: any, response: any, next?: (err?: any) => any): Promise<any> => {
  const { headers } = request;
  const token = headers['authorization'];

  console.log('HI');

  try {
    const appUserFromToken = await authenticationService.verifyToken(token);

    if (appUserFromToken === undefined) {
      throw new ForbiddenError(ERR_MSGS.USER_NOT_AUTHENTICATED);
    }

    const isAuthorized = await authorizationService.hasSufficientRole(
      permittedRoles,
      appUserFromToken
    );

    if (isAuthorized) {
      return next();
    }

    throw new UnauthorizedError(ERR_MSGS.USER_NOT_AUTHORIZED);
  } catch (err) {
    return next(err);
  }
};

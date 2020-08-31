import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from 'routing-controllers';

import { AuthorizationService, AuthenticationService } from '@Services';
import * as ERR_MSGS from '../../constants/ErrResponses';

export const AuthMiddleware = (
  authenticationService: AuthenticationService,
  authorizationService: AuthorizationService,
  permittedRoles: Array<string>
) => async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  const { headers } = request;
  const token = headers['authorization'];

  const appUserFromToken = await authenticationService.verifyToken(token);

  if (appUserFromToken === undefined) {
    return response.status(403).send({ error: ERR_MSGS.USER_NOT_AUTHENTICATED });
  }

  const isAuthorized = authorizationService.hasSufficientRole(permittedRoles, appUserFromToken);

  if (!isAuthorized) {
    return response.status(401).send({ error: ERR_MSGS.USER_NOT_AUTHORIZED });
  }

  next();
};

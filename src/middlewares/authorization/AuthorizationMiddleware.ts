import { ExpressMiddlewareInterface } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';

import { AuthorizationService, AuthenticationService } from '@Services';
import * as ERR_MSGS from '../../constants/ErrResponses';

@singleton()
export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
  private authenticationService: AuthenticationService;
  private authorizationService: AuthorizationService;
  private permittedRoles: Array<string>;

  constructor(
    @inject(AuthenticationService) authenticationService: AuthenticationService,
    @inject(AuthorizationService) authorizationService: AuthorizationService
  ) {
    this.authenticationService = authenticationService;
    this.authorizationService = authorizationService;
  }

  async use(request: any, response: any, next?: (err?: any) => any): Promise<any> {
    const { permittedRoles } = this;
    const { headers } = request;
    const token = headers['authorization'];

    try {
      const appUserFromToken = await this.authenticationService.verifyToken(token);

      if (appUserFromToken === undefined) {
        return next(ERR_MSGS.USER_NOT_AUTHENTICATED);
      }

      const isAuthorized = await this.authorizationService.hasSufficientRole(
        permittedRoles,
        appUserFromToken
      );

      if (isAuthorized) {
        return next();
      }

      return next(ERR_MSGS.USER_NOT_AUTHORIZED);
    } catch (err) {
      return next(err);
    }
  }

  setPermittedRoles(permittedRoles: Array<string>) {
    this.permittedRoles = permittedRoles;
  }
}

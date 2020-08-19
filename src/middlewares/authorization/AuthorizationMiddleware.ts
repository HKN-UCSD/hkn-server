import { ExpressMiddlewareInterface } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';

import { AuthorizationService } from '@Services';
import * as ERR_MSGS from '../../constants/ErrResponses';

@singleton()
export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
  private authorizationService: AuthorizationService;
  private permittedRoles: Array<string>;

  constructor(
    @inject(AuthorizationService) authorizationService: AuthorizationService,
    permittedRoles: Array<string>
  ) {
    this.authorizationService = authorizationService;
    this.permittedRoles = permittedRoles;
  }

  async use(request: any, response: any, next?: (err?: any) => any): Promise<any> {
    const { permittedRoles } = this;

    try {
      // How to get user id from token from here? If we use verifyToken from AuthenticationService then it's
      // basically doing both authentication and authorization for actions users can do after logging in.
      //const isAuthorized = await this.authorizationService.hasSufficientRole(this.permittedRoles, );
    } catch (err) {
      return next(err);
    }
  }
}

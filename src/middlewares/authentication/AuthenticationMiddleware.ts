import { ExpressMiddlewareInterface } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';

import { AuthenticationService } from '@Services';
import * as ERR_MSGS from '../../constants/ErrResponses';

@singleton()
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  private authenticationService: AuthenticationService;

  constructor(@inject(AuthenticationService) authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  async use(request: any, response: any, next?: (err?: any) => any): Promise<any> {
    const { headers } = request;
    const token = headers['authorization'];

    try {
      const tokenResult = await this.authenticationService.verifyToken(token);

      if (tokenResult === undefined) {
        return next(ERR_MSGS.USER_NOT_AUTHENTICATED);
      }

      return next();
    } catch (err) {
      return next(err);
    }
  }
}

import { ExpressMiddlewareInterface } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';

import { AuthenticationService } from '@Services';
import { config } from '../../config';
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
    const { customEnvMode } = config;

    try {
      const tokenResult = await this.authenticationService.verifyToken(customEnvMode, token);

      if (tokenResult !== undefined) {
        return next();
      } else {
        return next(ERR_MSGS.USER_NOT_AUTHENTICATED);
      }
    } catch (err) {
      return next(err);
    }
  }
}

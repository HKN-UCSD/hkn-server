import { singleton, inject } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthenticationService, AuthorizationService } from '@Services';
import { AuthorizationMiddleware } from './AuthorizationMiddleware';
import * as ERR_MSGS from '../../constants/ErrResponses';

@singleton()
export class AuthorizationFactory {
  private authenticationService: AuthenticationService;
  private authorizationService: AuthorizationService;

  constructor(
    @inject(AuthenticationService) authenticationService: AuthenticationService,
    @inject(AuthorizationService) authorizationService: AuthorizationService
  ) {
    this.authenticationService = authenticationService;
    this.authorizationService = authorizationService;
  }

  getAuthorizationMiddleware(permissionLevel: string): AuthorizationMiddleware {
    const { authenticationService, authorizationService } = this;
    const authorizationMiddleware = new AuthorizationMiddleware(
      authenticationService,
      authorizationService
    );

    switch (permissionLevel) {
      case AppUserRole.ADMIN:
        authorizationMiddleware.setPermittedRoles([AppUserRole.ADMIN]);
        break;
      case AppUserRole.OFFICER:
        authorizationMiddleware.setPermittedRoles([AppUserRole.ADMIN, AppUserRole.OFFICER]);
        break;
      case AppUserRole.MEMBER:
        authorizationMiddleware.setPermittedRoles([
          AppUserRole.ADMIN,
          AppUserRole.OFFICER,
          AppUserRole.MEMBER,
        ]);
        break;
      case AppUserRole.INDUCTEE:
        authorizationMiddleware.setPermittedRoles([
          AppUserRole.ADMIN,
          AppUserRole.OFFICER,
          AppUserRole.MEMBER,
          AppUserRole.INDUCTEE,
        ]);
        break;
      case AppUserRole.GUEST:
        authorizationMiddleware.setPermittedRoles([
          AppUserRole.ADMIN,
          AppUserRole.OFFICER,
          AppUserRole.MEMBER,
          AppUserRole.INDUCTEE,
          AppUserRole.GUEST,
        ]);
        break;
      default:
        throw new Error(ERR_MSGS.INVALID_ROLE);
    }

    return authorizationMiddleware;
  }
}

import { singleton, inject } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthenticationService, AuthorizationService } from '@Services';
import { AuthMiddleware } from './AuthMiddleware';

interface rolePermissions {
  [key: string]: Array<string>;
}

const rolePermisssionMapping: rolePermissions = {
  admin: [AppUserRole.ADMIN],
  officer: [AppUserRole.ADMIN, AppUserRole.OFFICER],
  member: [AppUserRole.ADMIN, AppUserRole.OFFICER, AppUserRole.MEMBER],
  inductee: [AppUserRole.ADMIN, AppUserRole.OFFICER, AppUserRole.MEMBER, AppUserRole.INDUCTEE],
  guest: [
    AppUserRole.ADMIN,
    AppUserRole.OFFICER,
    AppUserRole.MEMBER,
    AppUserRole.INDUCTEE,
    AppUserRole.GUEST,
  ],
};

@singleton()
export class AuthMiddlewareFactory {
  private authenticationService: AuthenticationService;
  private authorizationService: AuthorizationService;

  constructor(
    @inject(AuthenticationService) authenticationService: AuthenticationService,
    @inject(AuthorizationService) authorizationService: AuthorizationService
  ) {
    this.authenticationService = authenticationService;
    this.authorizationService = authorizationService;
  }

  getAuthMiddleware(permissionLevel: string) {
    const { authenticationService, authorizationService } = this;

    return AuthMiddleware(
      authenticationService,
      authorizationService,
      rolePermisssionMapping[permissionLevel]
    );
  }
}

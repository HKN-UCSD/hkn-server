import { AppUserRole } from '@Entities';
import {
  AuthenticationService,
  AuthorizationService,
  AuthenticationServiceImpl,
  AuthorizationServiceImpl,
} from '@Services';
import { AuthMiddleware } from './AuthMiddleware';

interface rolePermissions {
  [key: string]: Array<string>;
}

const rolePermissionMapping: rolePermissions = {
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

export class AuthMiddlewareFactory {
  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService
  ) {}

  getAuthMiddleware(permissionLevel: string) {
    const { authenticationService, authorizationService } = this;

    return AuthMiddleware(
      authenticationService,
      authorizationService,
      rolePermissionMapping[permissionLevel]
    );
  }
}

export const AuthMiddlewareFactoryImpl = new AuthMiddlewareFactory(
  AuthenticationServiceImpl,
  AuthorizationServiceImpl
);

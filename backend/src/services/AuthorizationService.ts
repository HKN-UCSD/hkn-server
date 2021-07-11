import { AppUser } from '@Entities';
import { logFunc } from '@Logger';

const FILE_NAME = 'AuthorizationService.ts';

export class AuthorizationService {
  hasSufficientRole(permittedRoles: Array<string>, appUserToCheck: AppUser): boolean {
    logFunc('hasSufficientRole', { permittedRoles }, FILE_NAME);

    const { role } = appUserToCheck;
    return permittedRoles.includes(role);
  }
}

export const AuthorizationServiceImpl = new AuthorizationService();

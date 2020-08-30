import { AppUser } from '@Entities';

export class AuthorizationService {
  hasSufficientRole(permittedRoles: Array<string>, appUserToCheck: AppUser): Boolean {
    const { role } = appUserToCheck;

    return permittedRoles.includes(role);
  }
}

export const AuthorizationServiceImpl = new AuthorizationService();

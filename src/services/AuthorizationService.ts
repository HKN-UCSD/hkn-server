import { AppUser } from '@Entities';

export class AuthorizationService {
  hasSufficientRole(permittedRoles: Array<string>, appUserToCheck: AppUser): boolean {
    const { role } = appUserToCheck;

    return permittedRoles.includes(role);
  }
}

export const AuthorizationServiceImpl = new AuthorizationService();

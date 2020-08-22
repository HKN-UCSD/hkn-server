import { AppUser } from '@Entities';

export class AuthorizationService {
  async hasSufficientRole(
    permittedRoles: Array<string>,
    appUserToCheck: AppUser
  ): Promise<Boolean> {
    const { role } = appUserToCheck;

    return permittedRoles.includes(role);
  }
}

export const AuthorizationServiceImpl = new AuthorizationService();

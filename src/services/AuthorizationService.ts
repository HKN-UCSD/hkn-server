import { singleton } from 'tsyringe';
import { AppUser } from '@Entities';

@singleton()
export class AuthorizationService {
  async hasSufficientRole(
    permittedRoles: Array<string>,
    appUserToCheck: AppUser
  ): Promise<Boolean> {
    const { role } = appUserToCheck;

    return permittedRoles.includes(role);
  }
}

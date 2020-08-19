import { singleton } from 'tsyringe';
import { AppUser } from '@Entities';

@singleton()
export class AuthorizationService {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  constructor() {}

  async hasSufficientRole(
    permittedRoles: Array<string>,
    appUserToCheck: AppUser
  ): Promise<Boolean> {
    const { role } = appUserToCheck;

    return permittedRoles.includes(role);
  }
}

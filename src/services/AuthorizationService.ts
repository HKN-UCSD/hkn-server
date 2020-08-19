import { singleton, inject } from 'tsyringe';

import { AppUserService } from './AppUserService';

@singleton()
export class AuthorizationService {
  private appUserService: AppUserService;

  constructor(@inject(AppUserService) appUserService: AppUserService) {
    this.appUserService = appUserService;
  }

  async hasSufficientRole(permittedRoles: Array<string>, appUserId: number): Promise<Boolean> {
    const appUserToCheck = await this.appUserService.getAppUserById(appUserId);
    const { role } = appUserToCheck;

    return permittedRoles.includes(role);
  }
}

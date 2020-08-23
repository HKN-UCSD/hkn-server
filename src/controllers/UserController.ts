import { JsonController, Get, Param, CurrentUser, ForbiddenError } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { AppUser, AppUserRole } from '@Entities';
import { AppUserService, AppUserServiceImpl } from '@Services';
import { AppUserRolesResponse } from '@Payloads';

@JsonController('/api/users')
export class UserController {
  constructor(private appUserService: AppUserService) {}

  @Get('/:userID/roles')
  @ResponseSchema(AppUserRolesResponse)
  async getUserRole(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AppUserRolesResponse | undefined> {
    const { role, id } = appUser;

    if (!(role === AppUserRole.ADMIN || role === AppUserRole.OFFICER) && id != userID) {
      throw new ForbiddenError();
    }

    const queriedRoleFromId = await this.appUserService.getAppUserRoleById(userID);

    if (queriedRoleFromId === undefined) {
      return undefined;
    }

    return { role: queriedRoleFromId };
  }
}

export const UserControllerImpl = new UserController(AppUserServiceImpl);

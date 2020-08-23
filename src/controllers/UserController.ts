import { JsonController, Get, Param, CurrentUser, ForbiddenError } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { AppUser, AppUserRole } from '@Entities';
import { AppUserService, AppUserServiceImpl } from '@Services';
import { AppUserMapper, AppUserMapperImpl } from '@Mappers';
import { AppUserRolesResponse } from '@Payloads';

@JsonController('/api/users')
export class UserController {
  constructor(private appUserService: AppUserService, private appUserMapper: AppUserMapper) {}

  @Get('/:userId/roles')
  @ResponseSchema(AppUserRolesResponse)
  async getUserRole(
    @Param('userId') userId: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AppUserRolesResponse | undefined> {
    const { role, id } = appUser;

    if (!(role === AppUserRole.ADMIN || role === AppUserRole.OFFICER) && id != userId) {
      throw new ForbiddenError();
    }

    const queriedAppUser = await this.appUserService.getAppUserById(userId);

    if (queriedAppUser === undefined) {
      return undefined;
    }

    return this.appUserMapper.entityToRolesResponse(queriedAppUser);
  }
}

export const UserControllerImpl = new UserController(AppUserServiceImpl, AppUserMapperImpl);

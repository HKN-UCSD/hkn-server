import { JsonController, Post, Body } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { AppUserSignupRequest, AppUserResponse } from '@Payloads';
import { AppUserMapper, AppUserMapperImpl } from '@Mappers';
import { AppUserService, AppUserServiceImpl, createNewFirebaseUser } from '@Services';

@JsonController('/api/auth')
export class AuthController {
  constructor(private appUserService: AppUserService, private appUserMapper: AppUserMapper) {}

  @Post('/signup')
  @ResponseSchema(AppUserResponse)
  async signUpUser(
    @Body() appUserSignupRequest: AppUserSignupRequest
  ): Promise<AppUserResponse | undefined> {
    const { email, password, firstName, lastName, major, graduationYear } = appUserSignupRequest;

    const appUserWhitelisted = await this.appUserService.getAppUserByEmail(email);

    if (appUserWhitelisted === undefined) {
      return undefined;
    }

    const appUserId = appUserWhitelisted.id;
    const newFirebaseUser = await createNewFirebaseUser(appUserId, email, password);

    if (newFirebaseUser === undefined) {
      return undefined;
    }

    const appUserInfo = { email, firstName, lastName, major, graduationYear };
    const appUserToSave = await this.appUserMapper.requestToExistingEntity(appUserInfo, appUserId);

    return await this.appUserService.saveAppUser(appUserToSave);
  }
}

export const AuthControllerImpl = new AuthController(AppUserServiceImpl, AppUserMapperImpl);

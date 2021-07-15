import { JsonController, Post, Body } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { AppUser } from '@Entities';
import { AppUserSignupRequest, AppUserResponse } from '@Payloads';
import { AppUserMapper, AppUserMapperImpl } from '@Mappers';
import { AppUserService, AppUserServiceImpl, AccountService, AccountServiceImpl } from '@Services';

@JsonController('/api/auth')
export class AuthController {
  constructor(
    private appUserService: AppUserService,
    private accountService: AccountService,
    private appUserMapper: AppUserMapper
  ) {}

  @Post('/signup')
  @ResponseSchema(AppUserResponse)
  async signUpUser(
    @Body() appUserSignupRequest: AppUserSignupRequest
  ): Promise<AppUserResponse | undefined> {
    const { email, password, firstName, lastName, major, graduationYear } = appUserSignupRequest;
    const appUserFromEmail: AppUser = await this.appUserService.getAppUserByEmail(email);

    if (appUserFromEmail === undefined || this.appUserService.isGuest(appUserFromEmail)) {
      console.log('user ' + email + ' not found');
      return undefined;
    }

    const appUserID: number = appUserFromEmail.id;
    const newAccountID: string = await this.accountService.createNewAccount(
      appUserID,
      email,
      password
    );

    if (newAccountID === undefined) {
      return undefined;
    }

    const appUserInfo = { email, firstName, lastName, major, graduationYear };
    const appUserToSave: AppUser = await this.appUserMapper.requestToExistingEntity(
      appUserInfo,
      appUserID
    );

    const savedAppUser: AppUser = await this.appUserService.saveAppUser(appUserToSave);
    return this.appUserMapper.entityToResponse(savedAppUser);
  }
}

export const AuthControllerImpl = new AuthController(
  AppUserServiceImpl,
  AccountServiceImpl,
  AppUserMapperImpl
);

import { JsonController, Post, Body } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { AppUser } from '@Entities';
import { AppUserSignupRequest, AppUserResponse, InducteeSignupInfo } from '@Payloads';
import { AppUserMapper, AppUserMapperImpl } from '@Mappers';
import {
  AppUserService,
  AppUserServiceImpl,
  AccountService,
  AccountServiceImpl,
  InductionClassService,
  InductionClassServiceImpl,
} from '@Services';

@JsonController('/api/auth')
export class AuthController {
  constructor(
    private appUserService: AppUserService,
    private accountService: AccountService,
    private inductionClassService: InductionClassService,
    private appUserMapper: AppUserMapper
  ) {}

  @Post('/inductee-signup')
  @ResponseSchema(AppUserResponse)
  async inducteeSignUp(
    @Body() appUserSignupRequest: AppUserSignupRequest
  ): Promise<AppUserResponse | undefined> {
    const {
      email,
      password,
      firstName,
      lastName,
      major,
      graduationYear,
      preferredName,
      pronoun,
      customPronoun,
      infoSession,
      courseRequirement,
      newsletter,
    } = appUserSignupRequest;

    // Check if email already exists
    const appUserFromEmail: AppUser = await this.appUserService.getAppUserByEmail(email);
    const role = 'inductee';
    const currInductionClass = await this.inductionClassService.getCurrentInductionClass();
    const quarter = currInductionClass === undefined ? undefined : currInductionClass.quarter;
    let newAppUser = undefined;

    if (appUserFromEmail !== undefined) {
      if (!this.appUserService.isGuest(appUserFromEmail)) {
        console.log(email + ' already has an account');
        return undefined;
      } else {
        appUserFromEmail.firstName = firstName;
        appUserFromEmail.lastName = lastName;
        appUserFromEmail.major = major;
        appUserFromEmail.graduationYear = graduationYear;
        appUserFromEmail.preferredName = preferredName;
        appUserFromEmail.pronoun = pronoun;
        appUserFromEmail.customPronoun = customPronoun;
        appUserFromEmail.infoSession = infoSession;
        appUserFromEmail.courseRequirement = courseRequirement;
        appUserFromEmail.newsletter = newsletter;
        appUserFromEmail.role = role;
        appUserFromEmail.inductionClass = currInductionClass;
        newAppUser = appUserFromEmail;
      }
    } else {
      const req = new InducteeSignupInfo();
      req.email = email;
      req.firstName = firstName;
      req.lastName = lastName;
      req.major = major;
      req.graduationYear = graduationYear;
      req.preferredName = preferredName;
      req.pronoun = pronoun;
      req.customPronoun = customPronoun;
      req.infoSession = infoSession;
      req.courseRequirement = courseRequirement;
      req.newsletter = newsletter;
      req.role = role;
      req.inductionClassQuarter = quarter;

      newAppUser = await this.appUserMapper.requestToNewEntity(req);
    }

    if (newAppUser === undefined) {
      console.log('It should never have gotten here.');
      return undefined;
    }

    const savedAppUser: AppUser = await this.appUserService.saveAppUser(newAppUser);
    const appUserID: number = savedAppUser.id;

    const newAccountID: string = await this.accountService.createNewAccount(
      appUserID,
      email,
      password
    );

    if (newAccountID === undefined) {
      return undefined;
    }

    return this.appUserMapper.entityToResponse(savedAppUser);
  }

  /* @Post('/signup')
  @ResponseSchema(AppUserResponse)
  async signUpUser(
    @Body() appUserSignupRequest: AppUserSignupRequest
  ): Promise<AppUserResponse | undefined> {
    const {
      email,
      password,
      firstName,
      lastName,
      major,
      graduationYear,
      preferredName,
      pronoun,
      customPronoun,
      infoSession,
      courseRequirement,
      newsletter,
    } = appUserSignupRequest;

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

    const appUserInfo = {
      email,
      firstName,
      lastName,
      major,
      graduationYear,
      preferredName,
      pronoun,
      customPronoun,
      infoSession,
      courseRequirement,
      newsletter,
    };
    const appUserToSave: AppUser = await this.appUserMapper.requestToExistingEntity(
      appUserInfo,
      appUserID
    );

    const savedAppUser: AppUser = await this.appUserService.saveAppUser(appUserToSave);
    return this.appUserMapper.entityToResponse(savedAppUser);
  } */
}

export const AuthControllerImpl = new AuthController(
  AppUserServiceImpl,
  AccountServiceImpl,
  InductionClassServiceImpl,
  AppUserMapperImpl
);

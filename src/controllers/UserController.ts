import {
  JsonController,
  Get,
  Param,
  CurrentUser,
  ForbiddenError,
  Post,
  Body,
  UseBefore,
  QueryParams,
} from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AppUser } from '@Entities';
import { AppUserService, AppUserServiceImpl } from '@Services';
import {
  AppUserPostRequest,
  AppUserResponse,
  AppUserRolesResponse,
  AppUserProfileResponse,
  MultipleUserQuery,
  MultipleAppUserResponse,
  MultipleUserNameResponse,
} from '@Payloads';
import { AppUserMapper, AppUserMapperImpl } from '@Mappers';
import { InducteeAuthMiddleware, OfficerAuthMiddleware } from '@Middlewares';

@JsonController('/api/users')
export class UserController {
  constructor(private appUserService: AppUserService, private appUserMapper: AppUserMapper) {}

  @Get('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(MultipleAppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getMultipleUsers(
    @QueryParams() multipleUserQuery: MultipleUserQuery
  ): Promise<MultipleAppUserResponse | MultipleUserNameResponse> {
    const multipleUsers = await this.appUserService.getAllAppUsers(multipleUserQuery);

    return { users: multipleUsers };
  }

  @Post('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async createUser(@Body() appUserCreateRequest: AppUserPostRequest): Promise<AppUserResponse> {
    const newAppUser = this.appUserMapper.requestToNewEntity(appUserCreateRequest);
    const savedAppUser = await this.appUserService.saveAppUser(newAppUser);

    return this.appUserMapper.entityToResponse(savedAppUser);
  }

  // TODO: Add auth
  @Get('/:userID')
  @ResponseSchema(AppUserProfileResponse)
  async getUserProfile(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AppUserProfileResponse | undefined> {
    const { id } = appUser;

    const appUserObj: AppUser = await this.appUserService.getAppUserById(userID);

    return this.appUserMapper.entityToProfileResponse(appUserObj);
  }

  @Post('/:userID')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async updateUserProfile(
    @Param('userID') userID: number,
    @Body() appUserUpdateRequest: AppUserPostRequest,
    @CurrentUser({ required: true })
    appUser: AppUser
  ): Promise<AppUserResponse | undefined> {
    if (this.appUserService.isInvalidNonOfficerAccess(appUser, userID)) {
      throw new ForbiddenError();
    }

    const updatedAppUserToSave = await this.appUserMapper.requestToExistingEntity(
      appUserUpdateRequest,
      userID
    );

    const savedAppUser = await this.appUserService.saveAppUser(updatedAppUserToSave);

    return this.appUserMapper.entityToResponse(savedAppUser);
  }

  @Get('/:userID/roles')
  @UseBefore(InducteeAuthMiddleware)
  @ResponseSchema(AppUserRolesResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getUserRole(
    @Param('userID') userID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AppUserRolesResponse | undefined> {
    if (this.appUserService.isInvalidNonOfficerAccess(appUser, userID)) {
      throw new ForbiddenError();
    }

    const queriedRoleFromId = await this.appUserService.getAppUserRoleById(userID);

    if (queriedRoleFromId === undefined) {
      return undefined;
    }

    return { role: queriedRoleFromId };
  }
}

export const UserControllerImpl = new UserController(AppUserServiceImpl, AppUserMapperImpl);

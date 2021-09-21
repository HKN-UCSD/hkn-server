import {
  AppUserEventRequest,
  AppUserResponse,
  AppUserEventResponse,
  AppUserProfileResponse,
  AppUserPostRequest,
  InducteePostRequest,
} from '@Payloads';
import { AppUser, InductionClass } from '@Entities';
import { AppUserService, AppUserServiceImpl } from '@Services';

import { classToPlain, plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';

export class AppUserMapper {
  constructor(private appUserService: AppUserService) {}

  /**
   * Converts an EventSignInRequest payload to an AppUser entity and
   * returns the newly created entity to the caller.
   *
   * @param {AppUserPostRequest | AppUserEventRequest | InducteePostRequest} appUserRequest The request payload from which the AppUser entity is created.
   * @returns {AppUser} A newly created AppUser entity.
   */
  async requestToNewEntity(
    appUserRequest: AppUserPostRequest | AppUserEventRequest | InducteePostRequest
  ): Promise<AppUser> {
    const appUserRepository = getRepository(AppUser);
    const inductionClassRepository = getRepository(InductionClass);

    if (appUserRequest instanceof InducteePostRequest) {
      const inductionClass = await inductionClassRepository.findOne({
        quarter: appUserRequest.inductionClassQuarter,
      });
      const plainAppUserRequest: Object = classToPlain(appUserRequest);

      const appUser = appUserRepository.create(plainAppUserRequest);
      appUser.inductionClass = inductionClass;

      return appUser;
    }

    if (appUserRequest instanceof AppUserPostRequest) {
      const inductionClass = await inductionClassRepository.findOne({
        quarter: appUserRequest.inductionClassQuarter,
      });
      const plainAppUserRequest: Object = classToPlain(appUserRequest);

      const appUser = appUserRepository.create(plainAppUserRequest);
      appUser.inductionClass = inductionClass;

      return appUser;
    }

    const plainAppUserRequest: Object = classToPlain(appUserRequest);

    return appUserRepository.create(plainAppUserRequest);
  }

  /**
   * Updates an existing AppUser entity with new data from the request payload.
   * If there is no AppUser entity with the passed-in appUserId, then return undefined.
   *
   * @param {AppUserPostRequest | AppUserEventRequest} appUserRequest The request payload from which the updated
   *                                             existing AppUser entity is created.
   * @param {number} appUserId The supposed ID of an existing AppUser entity.
   * @returns {Promise} An updated AppUser entity.
   */
  async requestToExistingEntity(
    appUserRequest: AppUserPostRequest | AppUserEventRequest,
    appUserId: number
  ): Promise<AppUser | undefined> {
    const appUserObj: AppUser = appUserRequest as AppUser;
    appUserObj.id = appUserId;

    const appUserRepository = getRepository(AppUser);
    const inductionClassRepository = getRepository(InductionClass);
    const appUser: AppUser = await appUserRepository.preload(appUserObj);

    if (appUserRequest instanceof AppUserPostRequest) {
      const inductionClass = await inductionClassRepository.findOne({
        quarter: appUserRequest.inductionClassQuarter,
      });

      appUser.inductionClass = inductionClass;
    }

    return appUser;
  }

  /**
   * Calls requestToNewEntity if the requesting user cannot be found in AppUser table
   * (so if they are a non-affiliate that has never RSVP-ed for/signed in to an event
   * before) and calls requestToExistingEntity otherwise (non-affiliates
   * that has RSVP-ed for/signed in to an event before or affiliates).
   *
   * @param appUserRequest The request body of the POST request to /api/events/:eventID/signin.
   * @returns {Promise} A new AppUser entity (if not found in DB) or an updated one (if found).
   */
  async requestToEntityByEmail(appUserRequest: AppUserEventRequest): Promise<AppUser> {
    const { email } = appUserRequest;
    const appUserFromEmail = await this.appUserService.getAppUserByEmail(email);

    if (appUserFromEmail === undefined) {
      return this.requestToNewEntity(appUserRequest);
    } else {
      const { id } = appUserFromEmail;

      return await this.requestToExistingEntity(appUserRequest, id);
    }
  }

  entityToResponse(appUser: AppUser): AppUserResponse {
    const plainAppUser: Object = classToPlain(appUser);
    const appUserResponse: AppUserResponse = plainToClass(AppUserResponse, plainAppUser);

    return appUserResponse;
  }

  /**
   * Converts an AppUser entity to an AppUserEventResponse payload and returns the
   * newly created response payload to the caller.
   *
   * @param {AppUser} appUser The AppUser entity to be converted to an AppUserEventResponse
   *                          payload.
   * @returns {AppUserEventResponse} An AppUserEventResponse instance.
   */
  entityToUserEventResponse(appUser: AppUser): AppUserEventResponse {
    const plainAppUser: Object = classToPlain(appUser);
    const appUserResponse: AppUserEventResponse = plainToClass(AppUserEventResponse, plainAppUser);

    return appUserResponse;
  }

  /**
   * Converts an AppUser entity to an AppUserProfileResponse payload and returns the newly created
   * response payload to the caller.
   *
   * @param {AppUser} appUser The AppUser entity to be ocnverted to an AppUserProfileResponse payload.
   * @returns {AppUserProfileResponse} An AppUserProfileResponse instance.
   */
  entityToProfileResponse(appUser: AppUser): AppUserProfileResponse {
    const plainAppUserProfile: Object = classToPlain(appUser);
    const appUserProfileResponse: AppUserProfileResponse = plainToClass(
      AppUserProfileResponse,
      plainAppUserProfile
    );

    return appUserProfileResponse;
  }
}

export const AppUserMapperImpl = new AppUserMapper(AppUserServiceImpl);

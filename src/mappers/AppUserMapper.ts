import { AppUserEventRequest, AppUserEventResponse, AppUserRolesResponse } from '@Payloads';
import { AppUser } from '@Entities';
import { AppUserService, AppUserServiceImpl } from '@Services';

import { classToPlain, plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';

export class AppUserMapper {
  constructor(private appUserService: AppUserService) {}

  /**
   * Converts an EventSignInRequest payload to an AppUser entity and
   * returns the newly created entity to the caller.
   *
   * @param {AppUserEventRequest} appUserRequest The request payload from which the AppUser entity is created.
   * @returns {AppUser} A newly created AppUser entity.
   */
  requestToNewEntity(appUserRequest: AppUserEventRequest): AppUser {
    const appUserRepository = getRepository(AppUser);
    const plainAppUserRequest: Object = classToPlain(appUserRequest);

    return appUserRepository.create(plainAppUserRequest);
  }

  /**
   * Updates an existing AppUser entity with new data from the request payload.
   * If there is no AppUser entity with the passed-in appUserId, then return undefined.
   *
   * @param {AppUserEventRequest} appUserRequest The request payload from which the updated
   *                                             existing AppUser entity is created.
   * @param {number} appUserId The supposed ID of an existing AppUser entity.
   * @returns {Promise} An updated AppUser entity.
   */
  async requestToExistingEntity(
    appUserRequest: AppUserEventRequest,
    appUserId: number
  ): Promise<AppUser | undefined> {
    const appUserObj: AppUser = appUserRequest as AppUser;
    appUserObj.id = appUserId;

    const appUserRepository = getRepository(AppUser);
    const appUser: AppUser = await appUserRepository.preload(appUserObj);

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

  /**
   * Converts an AppUser entity to an AppUserEventResponse payload and returns the
   * newly created response payload to the caller.
   *
   * @param {AppUser} appUser The AppUser entity to be converted to an AppUserEventResponse
   *                          payload.
   * @returns {AppUserEventResponse} An AppUserEventResponse instance.
   */
  entityToResponse(appUser: AppUser): AppUserEventResponse {
    const plainAppUser: Object = classToPlain(appUser);
    const appUserResponse: AppUserEventResponse = plainToClass(AppUserEventResponse, plainAppUser);

    return appUserResponse;
  }
}

export const AppUserMapperImpl = new AppUserMapper(AppUserServiceImpl);

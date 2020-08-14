import { EventSignInRequest, EventSignInResponse } from '@Payloads';
import { AppUser } from '@Entities';
import { AppUserRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AppUserMapper {
  private appUserRepository: Repository<AppUser>;

  constructor(@inject(AppUserRepositoryToken) appUserRepository: Repository<AppUser>) {
    this.appUserRepository = appUserRepository;
  }

  /**
   * Converts an EventSignInRequest payload to an AppUser entity and
   * returns the newly created entity to the caller.
   *
   * @param appUserRequest The request payload from which the AppUser entity
   *                       is created.
   */
  requestToNewEntity(appUserRequest: EventSignInRequest): AppUser {
    const plainAppUserRequest: Object = classToPlain(appUserRequest);
    return this.appUserRepository.create(plainAppUserRequest);
  }

  /**
   * Updates an existing AppUser entity with new data from the request payload.
   * If there is no AppUser entity with the passed-in appUserId, then return undefined.
   *
   * @param appUserRequest The request payload from which the updated existing AppUser
   *                       entity is created
   * @param appUserId The supposed ID of an existing AppUser entity.
   */
  async requestToExistingEntity(
    appUserRequest: EventSignInRequest,
    appUserId: number
  ): Promise<AppUser | undefined> {
    const appUserObj: AppUser = appUserRequest as AppUser;
    appUserObj.id = appUserId;

    const appUser: AppUser = await this.appUserRepository.preload(appUserObj);
    if (appUser == undefined) {
      return undefined;
    }

    return appUser;
  }

  /**
   * Converts an AppUser entity to an EventSignInResponse payload and returns the
   * newly created response payload to the caller.
   *
   * @param appUser The AppUser entity to be converted to an EventSignInResponse
   *                payload.
   */
  entityToResponse(appUser: AppUser): EventSignInResponse {
    const plainAppUser: Object = classToPlain(appUser);
    const appUserResponse: EventSignInResponse = plainToClass(EventSignInResponse, plainAppUser);

    return appUserResponse;
  }
}

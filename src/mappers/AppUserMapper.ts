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

  requestToNewEntity(appUserRequest: EventSignInRequest): AppUser {
    const plainAppUserRequest: Object = classToPlain(appUserRequest);
    return this.appUserRepository.create(plainAppUserRequest);
  }

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

  entityToResponse(appUser: AppUser): EventSignInResponse {
    const plainAppUser: Object = classToPlain(appUser);
    const appUserResponse: EventSignInResponse = plainToClass(EventSignInResponse, plainAppUser);

    return appUserResponse;
  }
}

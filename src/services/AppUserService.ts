import { AppUser, AppUserRole } from '@Entities';
import { AppUserMapper } from '@Mappers';
import { EventSignInRequest } from '@Payloads';
import { singleton, inject } from 'tsyringe';
import { Any, Repository, getRepository } from 'typeorm';

@singleton()
export class AppUserService {
  private appUserRepository: Repository<AppUser>;
  private appUserMapper: AppUserMapper;

  constructor(@inject(AppUserMapper) appUserMapper: AppUserMapper) {
    this.appUserRepository = getRepository(AppUser);
    this.appUserMapper = appUserMapper;
  }

  /**
   * Stores the AppUser passed in as a parameter to the
   * AppUser table.
   *
   * @param appUser The AppUser to be stored to the db.
   */
  async saveAppUser(appUser: AppUser): Promise<AppUser> {
    return await this.appUserRepository.save(appUser);
  }

  /**
   * Get multiple app users.
   *
   * @param ids Array of ids of AppUsers to find.
   */
  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    return this.appUserRepository.find({ id: Any(ids) });
  }

  /**
   * Get an existing AppUser by their email address.
   *
   * @param email The email used to look for the corresponding AppUser.
   *
   */
  getAppUserByEmail(email: string): Promise<AppUser> {
    return this.appUserRepository.findOne({ email });
  }

  async saveNonAffiliate(appUserRequest: EventSignInRequest): Promise<AppUser | undefined> {
    const { email } = appUserRequest;
    const appUserFromEmail = await this.getAppUserByEmail(email);
    let currAppUser = null;

    if (appUserFromEmail === undefined) {
      currAppUser = this.appUserMapper.requestToNewEntity(appUserRequest);
    } else {
      const { id, role } = appUserFromEmail;

      if (role === AppUserRole.GUEST) {
        currAppUser = await this.appUserMapper.requestToExistingEntity(appUserRequest, id);
      } else {
        return undefined;
      }
    }

    return await this.saveAppUser(currAppUser);
  }
}

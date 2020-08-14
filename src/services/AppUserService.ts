import { AppUser } from '@Entities';
import { singleton } from 'tsyringe';
import { Any, Repository, getRepository } from 'typeorm';

@singleton()
export class AppUserService {
  private appUserRepository: Repository<AppUser>;

  constructor() {
    this.appUserRepository = getRepository(AppUser);
  }

  /**
   * Stores the AppUser passed in as a parameter to the
   * AppUser table.
   *
   * @param appUser The AppUser to be stored to the db.
   */
  async saveAppUser(appUser: AppUser): Promise<AppUser> {
    return this.appUserRepository.save(appUser);
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
}

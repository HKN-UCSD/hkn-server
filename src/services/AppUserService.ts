import { AppUser } from '@Entities';
import { singleton } from 'tsyringe';
import { Any, Repository, getRepository } from 'typeorm';

@singleton()
export class AppUserService {
  private appUserRepository: Repository<AppUser>;

  constructor() {
    this.appUserRepository = getRepository(AppUser);
  }

  saveAppUser(appUser: AppUser): Promise<AppUser> {
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

  getAppUserByEmail(email: string): Promise<AppUser> {
    return this.appUserRepository.findOne({ email });
  }
}

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
   * Get multiple app users.
   *
   * @param ids Array of ids of AppUsers to find.
   */
  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    return this.appUserRepository.find({ id: Any(ids) });
  }
}

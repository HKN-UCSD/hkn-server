import { AppUser } from '@Entities';
import { injectable } from 'tsyringe';
import { Any, Repository, getRepository } from 'typeorm';
import { AppUserServiceInterface } from './interfaces/AppUserServiceInterface';

@injectable()
export class AppUserService implements AppUserServiceInterface {
  private appUserRepository: Repository<AppUser>;

  constructor() {
    this.appUserRepository = getRepository(AppUser);
  }

  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    return this.appUserRepository.find({ id: Any(ids) });
  }
}

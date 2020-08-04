import { AppUser } from '@Entities';
import { injectable } from 'tsyringe';
import { Any, getRepository } from 'typeorm';
import { AppUserServiceInterface } from './interfaces/AppUserServiceInterface';
import { Repository } from 'typeorm';

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

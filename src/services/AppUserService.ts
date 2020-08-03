import { AppUser } from '@Entities';
import { Service } from 'typedi';
import { Any } from 'typeorm';
import { AppUserServiceInterface } from './interfaces/AppUserServiceInterface';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class AppUserService implements AppUserServiceInterface {
  @InjectRepository(AppUser)
  appUserRepository: Repository<AppUser>;

  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    return this.appUserRepository.find({ id: Any(ids) });
  }
}

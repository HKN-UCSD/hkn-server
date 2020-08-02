import { AppUser } from '@Entities';
import { Service } from 'typedi';
import { Any } from 'typeorm';
import { AppUserServiceInterface } from './interfaces/AppUserServiceInterface';

@Service()
export class AppUserService implements AppUserServiceInterface {
  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    return AppUser.find({ id: Any(ids) });
  }
}

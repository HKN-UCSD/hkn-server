import { AppUser } from '../entities/AppUser';
import { Service } from 'typedi';
import { Any } from 'typeorm';

@Service()
export class AppUserService {
  // typescript is kinda annoying when you use it with an orm...
  // union type doesn't work here either
  getMultipleFromRef(ids: AppUser[]): Promise<AppUser[]> {
    return AppUser.find({ id: Any(ids) });
  }
}

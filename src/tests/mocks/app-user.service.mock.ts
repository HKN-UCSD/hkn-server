import { AppUser } from '@Entities';
import { Service } from 'typedi';

@Service()
export class MockAppUserService {
  getMultipleFromRef(ids: AppUser[]): Promise<AppUser[]> {
    return new Promise(resolve => {
      resolve(ids);
    });
  }
}

import { AppUser } from '@Entities';

export interface AppUserServiceInterface {
  /**
   * Get multiple app users.
   *
   * @param ids Array of ids of AppUsers to find.
   */
  getMultipleAppUsers(ids: number[]): Promise<AppUser[]>;
}

export const AppUserServiceInterfaceToken = 'AppUserServiceInterface';

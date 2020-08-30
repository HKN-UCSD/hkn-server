import { AppUser, AppUserRole } from '@Entities';
import { Any, getRepository } from 'typeorm';

export class AppUserService {
  /**
   * Stores the AppUser passed in as a parameter to the
   * AppUser table.
   *
   * @param {AppUser} appUser The AppUser to be stored to the db.
   * @returns {Promise} The saved AppUser entity.
   */
  async saveAppUser(appUser: AppUser): Promise<AppUser> {
    const appUserRepository = getRepository(AppUser);

    return appUserRepository.save(appUser);
  }

  /**
   * Gets all app users.
   *
   * @returns {AppUser[]} Array of AppUser entities
   */
  getAllAppUsers(): Promise<AppUser[]> {
    const appUserRepository = getRepository(AppUser);

    return appUserRepository.find();
  }

  /**
   * Gets multiple app users.
   *
   * @param {number[]} ids Array of ids of AppUsers to find.
   * @returns {AppUser[]} Array of AppUser entities.
   */
  getMultipleAppUsers(ids: number[]): Promise<AppUser[]> {
    const appUserRepository = getRepository(AppUser);

    return appUserRepository.find({ id: Any(ids) });
  }

  /**
   * Get an existing AppUser by their id.
   *
   * @param {number} id The number used to query for an AppUser entity by ID.
   * @returns {Promise} An AppUser entity if it exists in AppUser table.
   */
  getAppUserById(id: number): Promise<AppUser | undefined> {
    const appUserRepository = getRepository(AppUser);

    return appUserRepository.findOne({ id });
  }

  /**
   * Get the role of an existing AppUser by their id.
   *
   * @param {number} id The number used to query for an AppUser entity by ID.
   * @returns {Promise} The role of the user if they exist in the AppUser table.
   */
  async getAppUserRoleById(id: number): Promise<string | undefined> {
    const appUser = await this.getAppUserById(id);

    return appUser?.role;
  }

  /**
   * Get an existing AppUser by their email address.
   *
   * @param {string} email The email used to look for the corresponding AppUser.
   * @returns {Promise} An AppUser entity if it exists in AppUser table.
   */
  getAppUserByEmail(email: string): Promise<AppUser | undefined> {
    const appUserRepository = getRepository(AppUser);

    return appUserRepository.findOne({ email });
  }

  /**
   * Save a non-affiliate as an AppUser in the DB (will not save affiliate
   * AppUser entities).
   *
   * @param {AppUser} appUser The AppUser to be saved if they are a non-affiliate.
   * @returns {Promise} The saved AppUser entity that is a non-affiliate.
   */
  async saveNonAffiliate(appUser: AppUser): Promise<AppUser | undefined> {
    const { role } = appUser;

    if (role !== undefined && role !== AppUserRole.GUEST) {
      return undefined;
    }

    return this.saveAppUser(appUser);
  }
}

export const AppUserServiceImpl = new AppUserService();

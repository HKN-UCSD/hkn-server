import { AppUser, AppUserRole } from '@Entities';
import { MultipleUserQuery } from '@Payloads';
import { Any, getRepository, FindManyOptions } from 'typeorm';

export class AppUserService {
  private buildMultipleUserQuery(multipleUserQuery: MultipleUserQuery): FindManyOptions<AppUser> {
    const { names, officers } = multipleUserQuery;
    const query: FindManyOptions<AppUser> = {};

    if (names) {
      query.select = ['firstName', 'lastName'];
    }

    if (officers) {
      query.where = { role: 'officer' };
    }

    return query;
  }

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
   * Gets multiple app users with every property on the entity schema or their names.
   * Can be filtered by officer role.
   *
   * @returns {AppUser[]} Array of AppUser entities
   */
  getAllAppUsers(multipleUserQuery: MultipleUserQuery): Promise<AppUser[]> {
    const appUserRepository = getRepository(AppUser);
    const query = this.buildMultipleUserQuery(multipleUserQuery);

    return appUserRepository.find(query);
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

  // TODO: Come up with a better name for this method
  isInvalidNonOfficerAccess(appUser: AppUser, urlUserID: number): boolean {
    const { role, id: requesterID } = appUser;

    if (!(role === AppUserRole.ADMIN || role === AppUserRole.OFFICER) && requesterID != urlUserID) {
      return true;
    }

    return false;
  }
}

export const AppUserServiceImpl = new AppUserService();

import admin from 'firebase-admin';
import '@firebase/auth';

export class AccountService {
  /**
   * Creates a new Firebase Auth user using Admin SDK.
   *
   * @param {number} id An AppUser entity's userID.
   * @param {string} email The same AppUser entity's email.
   * @param {string} password The password inputted by the user from the signup form.
   * @returns {string} The userID of the newly created Firebase Auth user, if the creation
   * process succeeds.
   */
  async createNewFirebaseUser(
    id: number,
    email: string,
    password: string
  ): Promise<string | undefined> {
    try {
      const newFirebaseUser = await admin.auth().createUser({
        uid: id.toString(10),
        email: email,
        password: password,
      });

      return newFirebaseUser.uid;
    } catch {
      return undefined;
    }
  }
}

export const AccountServiceImpl = new AccountService();

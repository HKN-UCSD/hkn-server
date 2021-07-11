import admin from 'firebase-admin';
import '@firebase/auth';

import { logFunc } from '@Logger';

const FILE_NAME = 'AccountService.ts';

export class AccountService {
  // getAuthService is needed instead of just AuthService because we need to wait for firebase to
  // load first :)))
  constructor(private getAuthService: () => IAuthService) { }

  /**
   * Creates a new Firebase Auth user using Admin SDK.
   *
   * @param {number} id An AppUser entity's userID.
   * @param {string} email The same AppUser entity's email.
   * @param {string} password The password inputted by the user from the signup form.
   * @returns {string} The userID of the newly created Firebase Auth user, if the creation
   * process succeeds.
   */
  async createNewAccount(id: number, email: string, password: string): Promise<string | undefined> {
    logFunc('createNewAccount', { id }, FILE_NAME); // Do not expose email or password

    try {
      const newFirebaseUser = await this.getAuthService().createUser({
        uid: id.toString(10),
        email: email,
        password: password,
      });

      return newFirebaseUser.uid;
    } catch (error) {
      console.log(error);
      // TODO log error
      return undefined;
    }
  }
}

// TODO fix overloaded authservice naming
interface IAuthService {
  createUser(properties: {
    uid: string;
    email: string;
    password: string;
  }): Promise<{ uid: string }>;
}

export const AccountServiceImpl = new AccountService(() => admin.auth());

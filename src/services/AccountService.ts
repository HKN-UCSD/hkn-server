import admin from 'firebase-admin';
import '@firebase/auth';

export class AccountService {
  // getAuthService is needed instead of just AuthService because we need to wait for firebase to
  // load first :)))
  constructor(private getAuthService: () => AuthService) {}

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
    try {
      const newFirebaseUser = await this.getAuthService().createUser({
        uid: id.toString(10),
        email: email,
        password: password,
      });

      return newFirebaseUser.uid;
    } catch {
      // TODO log error
      return undefined;
    }
  }
}

// TODO fix overloaded authservice naming
interface AuthService {
  createUser(properties: {
    uid: string;
    email: string;
    password: string;
  }): Promise<{ uid: string }>;
}

export const AccountServiceImpl = new AccountService(() => admin.auth());

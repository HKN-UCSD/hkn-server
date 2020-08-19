import admin from 'firebase-admin';
import { singleton, inject } from 'tsyringe';

import { AppUserService } from './AppUserService';
import { AppUser } from '@Entities';

@singleton()
export class AuthenticationService {
  private appUserService: AppUserService;

  constructor(@inject(AppUserService) appUserService: AppUserService) {
    this.appUserService = appUserService;
  }

  // Not sure if Promise<Object> or Promise<admin.auth.DecodedIdToken> is better...
  async firebaseVerifyIdToken(token: string): Promise<AppUser | undefined> {
    try {
      const tokenResult = await admin.auth().verifyIdToken(token);

      if (tokenResult != null) {
        const {
          claims: { user_id },
        } = tokenResult;

        return await this.appUserService.getAppUserById(user_id);
      } else {
        return undefined;
      }
    } catch {
      return undefined;
    }
  }

  async localVerifyIdToken(token: string): Promise<AppUser | undefined> {
    const id = parseInt(token, 10);
    return await this.appUserService.getAppUserById(id);
  }

  async verifyToken(mode: string, token: string): Promise<AppUser | undefined> {
    if (mode === 'development') {
      // Inject local token resolution function?
      return await this.localVerifyIdToken(token);
    }

    if (mode === 'production') {
      // Inject production token resolution functinon?
      return await this.firebaseVerifyIdToken(token);
    }

    return undefined;
  }
}

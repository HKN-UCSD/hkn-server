import admin from 'firebase-admin';

import { AppUserService, AppUserServiceImpl } from './AppUserService';
import { AppUser } from '@Entities';
import { config } from '../config';

export class AuthenticationService {
  constructor(private appUserService: AppUserService) {}

  async firebaseVerifyIdToken(token: string): Promise<AppUser | undefined> {
    try {
      const splitToken: string[] = token.split(' ');
      const userToken = splitToken[1];

      const tokenResult = await admin.auth().verifyIdToken(userToken);

      if (tokenResult == null) {
        return undefined;
      }

      const { user_id } = tokenResult;
      const id = parseInt(user_id, 10);

      if (isNaN(id)) {
        return undefined;
      }

      return await this.appUserService.getAppUserById(id);
    } catch {
      return undefined;
    }
  }

  async localVerifyIdToken(token: string): Promise<AppUser | undefined> {
    try {
      const splitToken: string[] = token.split(' ');
      const userToken = splitToken[1];

      const id = parseInt(userToken, 10);

      if (isNaN(id)) {
        return undefined;
      }

      return await this.appUserService.getAppUserById(id);
    } catch {
      return undefined;
    }
  }

  async verifyToken(token: string): Promise<AppUser | undefined> {
    const { devAuth } = config;

    if (devAuth) {
      return await this.localVerifyIdToken(token);
    } else {
      return await this.firebaseVerifyIdToken(token);
    }
  }
}

export const AuthenticationServiceImpl = new AuthenticationService(AppUserServiceImpl);

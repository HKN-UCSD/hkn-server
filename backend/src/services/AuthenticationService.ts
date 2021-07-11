import admin from 'firebase-admin';

import { AppUserService, AppUserServiceImpl } from './AppUserService';
import { AppUser } from '@Entities';
import { config } from '../config';
import { logFunc } from '@Logger';

const FILE_NAME = 'AuthenticationService.ts';

export class AuthenticationService {
  constructor(private appUserService: AppUserService) {}

  async firebaseVerifyIdToken(token: string): Promise<AppUser | undefined> {
    logFunc('firebaseVerifyIdToken', {}, FILE_NAME, '', {}, 'debug'); // Never expose tokens

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
    logFunc('localVerifyIdToken', {}, FILE_NAME, '', {}, 'debug'); // Never expose tokens

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
    logFunc('verifyIdToken', {}, FILE_NAME, '', {}, 'debug'); // Never expose tokens

    const { devAuth } = config;

    if (devAuth) {
      return await this.localVerifyIdToken(token);
    } else {
      return await this.firebaseVerifyIdToken(token);
    }
  }
}

export const AuthenticationServiceImpl = new AuthenticationService(AppUserServiceImpl);

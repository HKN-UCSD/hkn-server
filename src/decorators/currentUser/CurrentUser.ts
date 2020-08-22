import { Action } from 'routing-controllers';

import { AuthenticationService, AuthenticationServiceImpl } from '@Services';
import { AppUser } from '@Entities';

class CurrentUserDecoratorFactory {
  constructor(private authenticationService: AuthenticationService) {}

  getCurrentUserChecker(): (action: Action) => Promise<AppUser> {
    const currentUserChecker = async (action: Action): Promise<AppUser> => {
      const token = action.request.headers['authorization'];
      return await this.authenticationService.verifyToken(token);
    };

    return currentUserChecker;
  }
}

export const CurrentUserDecoratorFactoryImpl = new CurrentUserDecoratorFactory(
  AuthenticationServiceImpl
);

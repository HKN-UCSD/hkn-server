import { Action } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';

import { AuthenticationService } from '@Services';
import { AppUser } from '@Entities';

@singleton()
export class CurrentUserDecorator {
  private authenticationService: AuthenticationService;

  constructor(@inject(AuthenticationService) authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  getCurrentUserChecker(): (action: Action) => Promise<AppUser> {
    const currentUserChecker = async (action: Action): Promise<AppUser> => {
      const token = action.request.headers['authorization'];
      return await this.authenticationService.verifyToken(token);
    };

    return currentUserChecker;
  }
}

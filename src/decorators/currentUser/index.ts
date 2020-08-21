import { container } from 'tsyringe';
import { CurrentUserDecoratorFactory } from './CurrentUser';

export const checkCurrentUserToken = container
  .resolve(CurrentUserDecoratorFactory)
  .getCurrentUserChecker();

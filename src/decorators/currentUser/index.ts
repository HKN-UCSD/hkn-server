import { container } from 'tsyringe';
import { CurrentUserDecorator } from './CurrentUser';

export const checkCurrentUserToken = container
  .resolve(CurrentUserDecorator)
  .getCurrentUserChecker();

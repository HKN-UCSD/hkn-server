import { container } from 'tsyringe';
import { CurrentUserFactory } from './CurrentUser';

export const checkCurrentUserToken = container.resolve(CurrentUserFactory).getCurrentUserChecker();

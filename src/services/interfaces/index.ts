import { EventServiceInterface, EventServiceToken } from './EventServiceInterface';
import { AppUserServiceInterface, AppUserServiceToken } from './AppUserServiceInterface';

export { EventServiceToken, EventServiceInterface, AppUserServiceToken, AppUserServiceInterface };

export const DITokens = {
  EventServiceInterface: EventServiceToken,
  AppUserServiceInterface: AppUserServiceToken,
};

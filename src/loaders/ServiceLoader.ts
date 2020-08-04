import { EventService, AppUserService } from '@Services';
import { container } from 'tsyringe';
import {
  AppUserServiceInterface,
  AppUserServiceInterfaceToken,
  EventServiceInterface,
  EventServiceInterfaceToken,
} from '@Services/Interfaces';

/**
 * This function declares Services to be injected globally.
 *
 */
export function loadServices(): void {
  container.register<EventServiceInterface>(EventServiceInterfaceToken, EventService);
  container.register<AppUserServiceInterface>(AppUserServiceInterfaceToken, AppUserService);
}

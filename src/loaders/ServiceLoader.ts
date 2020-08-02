import { EventService, AppUserService } from '@Services';
import { Container } from 'typedi';
import { DITokens } from '@Services/Interfaces';

/**
 * This function declares Services to be injected globally.
 *
 * Unfortunately, typedi doesn't handle dependency resolution nicely
 * when you do proper DI with interfaces, so the *order* of the following
 * container.set calls matters.
 *
 * For example, if ServiceA depends on ServiceB, then the set call for ServiceB MUST
 * come before the set call for ServiceA.
 *
 * Perhaps tsyringe would be a good solution for this but typedi works too nicely
 * with typeorm and routing-controllers to giveup.
 */
export function loadServices(): void {
  Container.set(DITokens.AppUserServiceInterface, Container.get(AppUserService));
  Container.set(DITokens.EventServiceInterface, Container.get(EventService));
}

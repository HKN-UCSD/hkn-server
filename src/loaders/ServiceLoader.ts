import { EventService } from '@Services';
import { Container } from 'typedi';
import { DITokens } from '@Services/Interfaces';

export function loadServices(): void {
  Container.set(DITokens.EventServiceInterface, Container.get(EventService));
}

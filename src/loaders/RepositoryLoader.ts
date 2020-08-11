import { container } from 'tsyringe';
import { EventRepositoryToken, EventRepositoryFactory } from '@Repositories';
import { Event } from '@Entities';
import { Repository } from 'typeorm';

export function loadRepositories(): void {
  container.register<Repository<Event>>(EventRepositoryToken, {
    useFactory: EventRepositoryFactory,
  });
}

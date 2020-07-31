import { Event, AppUser } from '@Entities';
import { EventRequest } from '@Payloads';
import { AppUserService } from './AppUserService';
import { EventServiceInterface } from '@Services/Interfaces';

import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';

@Service()
export class EventService implements EventServiceInterface {
  @Inject()
  appUserService: AppUserService;

  @InjectRepository(Event)
  eventRepository: Repository<Event>;

  async createEvent(eventRequest: EventRequest): Promise<Event> {
    const event: Event = (eventRequest as unknown) as Event;
    if (eventRequest.hosts != null) {
      const hosts: AppUser[] = await this.appUserService.getMultipleAppUsers(
        eventRequest.hosts
      );
      event.hosts = hosts;
    }

    return this.eventRepository.save(event);
  }

  getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEventById(id: number): Promise<Event | undefined> {
    return this.eventRepository.findOne({ id });
  }

  async updateEvent(
    id: number,
    eventRequest: EventRequest
  ): Promise<Event | undefined> {
    const originalEvent = await this.eventRepository.findOne({ id });
    if (originalEvent === undefined) {
      return undefined;
    }

    const event: Event = (eventRequest as unknown) as Event;
    event.id = id;
    if (eventRequest.hosts != null) {
      const hosts: AppUser[] = await this.appUserService.getMultipleAppUsers(
        eventRequest.hosts
      );
      event.hosts = hosts;
    }
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number): Promise<Event | undefined> {
    const event = await this.eventRepository.findOne({ id });
    return event ? this.eventRepository.remove(event) : undefined;
  }
}

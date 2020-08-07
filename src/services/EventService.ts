import { Event, AppUser } from '@Entities';
import { EventRequest } from '@Payloads';
import {
  EventServiceInterface,
  AppUserServiceInterface,
  AppUserServiceInterfaceToken,
} from '@Services/Interfaces';

import { classToPlain } from 'class-transformer';
import { Repository, getRepository } from 'typeorm';
import { inject, injectable } from 'tsyringe';

@injectable()
export class EventService implements EventServiceInterface {
  private appUserService: AppUserServiceInterface;
  private eventRepository: Repository<Event>;

  constructor(@inject(AppUserServiceInterfaceToken) appUserService: AppUserServiceInterface) {
    this.appUserService = appUserService;
    this.eventRepository = getRepository(Event);
  }

  async createEvent(eventRequest: EventRequest): Promise<Event> {
    const event: Event = (eventRequest as unknown) as Event;
    if (eventRequest.hosts != null) {
      const hosts: AppUser[] = await this.appUserService.getMultipleAppUsers(eventRequest.hosts);
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

  async updateEvent(id: number, eventRequest: EventRequest): Promise<Event | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plainEventRequest: any = classToPlain(eventRequest);
    plainEventRequest.id = id;
    plainEventRequest.hosts = plainEventRequest.hosts.map((id: number) => {
      return { id };
    });

    const event: Event = await this.eventRepository.preload(plainEventRequest);

    if (event === undefined) {
      return undefined;
    }

    // preload ignores empty arrays and loads stuff anyways...
    if (plainEventRequest.hosts.length === 0) {
      event.hosts = [];
    }

    return this.eventRepository.save(event);
  }

  async deleteEvent(id: number): Promise<Event | undefined> {
    const event = await this.eventRepository.findOne({ id });
    return event ? this.eventRepository.remove(event) : undefined;
  }
}

import { Event } from '@Entities/Event';
import { EventRequest } from '@Requests/EventRequest';
import { AppUserService } from '@Services/AppUserService';
import {
  EventServiceInterface,
  EventServiceToken,
} from '@Services/Interfaces/EventServiceInterface';
import { Service, Inject } from 'typedi';
import { AppUser } from '@Entities/AppUser';

@Service(EventServiceToken)
export class EventService implements EventServiceInterface {
  @Inject()
  appUserService: AppUserService;

  async createEvent(eventRequest: EventRequest): Promise<Event> {
    const event: Event = (eventRequest as unknown) as Event;
    if (eventRequest.hosts != null) {
      const hosts: AppUser[] = await this.appUserService.getMultipleAppUsers(
        eventRequest.hosts
      );
      event.hosts = hosts;
    }

    return event.save();
  }

  getAllEvents(): Promise<Event[]> {
    return Event.find({});
  }

  getEventById(id: number): Promise<Event> {
    return Event.findOne({ id });
  }

  async updateEvent(id: number, eventRequest: EventRequest): Promise<Event> {
    const event: Event = (eventRequest as unknown) as Event;
    if (eventRequest.hosts != null) {
      const hosts: AppUser[] = await this.appUserService.getMultipleAppUsers(
        eventRequest.hosts
      );
      event.hosts = hosts;
    }
    return event.save();
  }

  async deleteEvent(id: number): Promise<Event> {
    const event = await Event.findOne({ id });
    return event?.remove();
  }
}

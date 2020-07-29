import { Event } from '@Entities/Event';
import { AppUserService } from '@Services/app-user.service';
import { Service, Inject } from 'typedi';
import { AppUser } from '@Entities/AppUser';
import { plainToClass } from 'class-transformer';

@Service()
export class EventService {
  @Inject()
  appUserService: AppUserService;

  // naming is questionable...
  // but we do need a mapper for each event to load the refs
  async constructEvent(plainEvent: object): Promise<Event> {
    const event: Event = plainToClass(Event, plainEvent);
    const hosts: AppUser[] = await this.appUserService.getMultipleFromRef(
      event.hosts
    );
    event.hosts = hosts;
    return event;
  }

  async createEvent(event: Event): Promise<Event> {
    return event.save();
  }

  getAllEvents(): Promise<Event[]> {
    return Event.find({});
  }

  getEventById(id: number): Promise<Event> {
    return Event.findOne({ id });
  }

  async updateEvent(event: Event): Promise<Event> {
    // assert that event with id exists
    return event.save();
  }

  async deleteEvent(id: number): Promise<Event> {
    const event = await Event.findOne({ id });
    return event?.remove();
  }
}

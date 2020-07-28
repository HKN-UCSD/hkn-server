import { Event } from '../../entities/Event';
import { Service, Inject } from 'typedi';
import { AppUserService } from '../../services/app-user.service';

@Service()
export class MockEventService {
  @Inject()
  appUserService: AppUserService;

  globalEventId: number;
  db: Map<number, Event>;

  constructor(db: Map<number, Event>) {
    this.globalEventId = 0;
    this.db = db;
  }

  createEvent(event: Event): Promise<Event> {
    const eventId = this.globalEventId++;
    event.id = eventId;
    this.db.set(eventId, event);
    return new Promise<Event>(resolve => {
      resolve(event);
    });
  }

  getAllEvents(): Promise<Event[]> {
    return new Promise<Event[]>(resolve => {
      resolve([...this.db.values()]);
    });
  }

  getEventById(id: number): Promise<Event> {
    const event: Event = this.db.has(id) ? this.db.get(id) : null;
    return new Promise<Event>(resolve => {
      resolve(event);
    });
  }

  updateEvent(event: Event): Promise<Event> {
    this.db.set(event.id, event);
    return new Promise<Event>(resolve => {
      resolve(this.db.get(event.id));
    });
  }

  deleteEvent(id: number): Promise<Event> {
    const eventToDelete = this.db.get(id);
    this.db.delete(id);
    return new Promise<Event>(resolve => {
      resolve(eventToDelete);
    });
  }
}

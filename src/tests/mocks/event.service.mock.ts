// import { Service, Inject } from 'typedi';
// import { Event } from '@Entities';
// import { AppUserService } from '@Services/AppUserService';
// import { EventServiceToken, EventServiceInterface } from '@Services/Interfaces';
// import { EventRequest } from '@Payloads';

// @Service(EventServiceToken)
// export class MockEventService implements EventServiceInterface {
//   @Inject()
//   appUserService: AppUserService;

//   globalEventId: number;
//   db: Map<number, Event>;

//   constructor(db: Map<number, Event>) {
//     this.globalEventId = 0;
//     this.db = db;
//   }

//   createEvent(eventRequest: EventRequest): Promise<Event> {
//     const eventId = this.globalEventId++;
//     const event: Event = (eventRequest as unknown) as Event;
//     event.id = eventId;
//     this.db.set(eventId, event);
//     return new Promise<Event>(resolve => {
//       resolve(event);
//     });
//   }

//   getAllEvents(): Promise<Event[]> {
//     return new Promise<Event[]>(resolve => {
//       resolve([...this.db.values()]);
//     });
//   }

//   getEventById(id: number): Promise<Event> {
//     const event: Event = this.db.has(id) ? this.db.get(id) : null;
//     return new Promise<Event>(resolve => {
//       resolve(event);
//     });
//   }

//   updateEvent(id: number, eventRequest: EventRequest): Promise<Event> {
//     const event = (eventRequest as unknown) as Event;
//     this.db.set(id, event);
//     return new Promise<Event>(resolve => {
//       resolve(this.db.get(id));
//     });
//   }

//   deleteEvent(id: number): Promise<Event> {
//     const eventToDelete = this.db.get(id);
//     this.db.delete(id);
//     return new Promise<Event>(resolve => {
//       resolve(eventToDelete);
//     });
//   }
// }

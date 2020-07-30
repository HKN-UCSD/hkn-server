import { Token } from 'typedi';
import { Event } from '@Entities/Event';
import { EventRequest } from '@Requests/EventRequest';

export interface EventServiceInterface {
  createEvent(event: EventRequest): Promise<Event>;
  getAllEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event>;
  updateEvent(id: number, event: EventRequest): Promise<Event>;
  deleteEvent(id: number): Promise<Event>;
}

export const EventServiceToken = new Token<EventServiceInterface>();

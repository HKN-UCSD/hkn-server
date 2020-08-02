import { Token } from 'typedi';
import { Event } from '@Entities';
import { EventRequest } from '@Payloads';

export interface EventServiceInterface {
  /**
   * Create event.
   *
   * @param {EventRequest} eventRequest Event to create.
   * @returns {Promise} Event created
   */
  createEvent(eventRequest: EventRequest): Promise<Event>;

  /**
   * Get all events.
   *
   * @returns {Event[]} Array of all events.
   */
  getAllEvents(): Promise<Event[]>;

  /**
   * Get event with given id. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to fetch.
   * @returns {Promise} Event with given id.
   */
  getEventById(id: number): Promise<Event | undefined>;

  /**
   * Update event with new event details. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to update.
   * @param {EventRequest} eventRequest New event details.
   */
  updateEvent(id: number, eventRequest: EventRequest): Promise<Event | undefined>;

  /**
   * Deletes event with given id. Returns undefined on invalid id.
   *
   * @param  {number} id ID of event to delete.
   * @returns {Promise} Deleted event.
   */
  deleteEvent(id: number): Promise<Event | undefined>;
}

export const EventServiceToken = new Token<EventServiceInterface>();

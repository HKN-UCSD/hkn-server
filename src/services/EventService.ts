import { Event } from '@Entities';
import { EventRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { singleton, inject } from 'tsyringe';

@singleton()
export class EventService {
  private eventRepository: Repository<Event>;

  constructor(@inject(EventRepositoryToken) eventRepository: Repository<Event>) {
    this.eventRepository = eventRepository;
  }

  /**
   * Persists event to db.
   * @param {Event} event event to save.
   * @returns {Promise} Saved event.
   */
  async saveEvent(event: Event): Promise<Event> {
    return this.eventRepository.save(event);
  }

  /**
   * Get all events.
   *
   * @returns {Event[]} Array of all events.
   */
  getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  /**
   * Get event with given id. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to fetch.
   * @returns {Promise} Event with given id.
   */
  getEventById(id: number): Promise<Event | undefined> {
    return this.eventRepository.findOne({ id });
  }

  /**
   * Deletes event with given id. Returns undefined on invalid id.
   *
   * @param  {number} id ID of event to delete.
   * @returns {Promise} Deleted event.
   */
  async deleteEvent(id: number): Promise<Event | undefined> {
    const event = await this.eventRepository.findOne({ id });
    return event ? this.eventRepository.remove(event) : undefined;
  }
}

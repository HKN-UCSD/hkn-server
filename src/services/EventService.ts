import { Event, AppUser, Attendance } from '@Entities';
import { EventRepositoryToken } from '@Repositories';
import { AttendanceService } from './AttendanceService';

import { Repository } from 'typeorm';
import { singleton, inject } from 'tsyringe';

@singleton()
export class EventService {
  private eventRepository: Repository<Event>;
  private attendanceService: AttendanceService;

  constructor(
    @inject(EventRepositoryToken) eventRepository: Repository<Event>,
    @inject(AttendanceService) attendanceService: AttendanceService
  ) {
    this.eventRepository = eventRepository;
    this.attendanceService = attendanceService;
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

  /**
   * Creates an Attendance entity using the event obtained from eventId and
   * the passed-in AppUser entity, then stores that Attendance entity to the
   * Attendance table.
   *
   * @param eventId
   * @param appUser
   */
  async registerForEventAttendance(eventId: number, appUser: AppUser): Promise<Attendance> {
    const event = await this.eventRepository.findOne({ id: eventId });
    const newAttendance = await this.attendanceService.registerAttendance(event, appUser);

    return newAttendance;
  }
}

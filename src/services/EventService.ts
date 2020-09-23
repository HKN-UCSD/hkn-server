import { Event, AppUser, Attendance, RSVP } from '@Entities';
import { AttendanceService, AttendanceServiceImpl } from './AttendanceService';
import { RSVPService, RSVPServiceImpl } from './RSVPService';

import { getRepository } from 'typeorm';
import { MultipleAttendanceQuery } from '@Payloads';

export class EventService {
  constructor(private attendanceService: AttendanceService, private rsvpService: RSVPService) {}

  /**
   * Persists event to db.
   * @param {Event} event event to save.
   * @returns {Promise} Saved event.
   */
  async saveEvent(event: Event): Promise<Event> {
    const eventRepository = getRepository(Event);

    return eventRepository.save(event);
  }

  /**
   * Get all events.
   *
   * @returns {Event[]} Array of all events.
   */
  getAllEvents(): Promise<Event[]> {
    const eventRepository = getRepository(Event);

    return eventRepository.find();
  }

  /**
   * Get event with given id. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to fetch.
   * @returns {Promise} Event with given id.
   */
  getEventById(id: number): Promise<Event | undefined> {
    const eventRepository = getRepository(Event);

    return eventRepository.findOne({ id });
  }

  /**
   * Deletes event with given id. Returns undefined on invalid id.
   *
   * @param  {number} id ID of event to delete.
   * @returns {Promise} Deleted event.
   */
  async deleteEvent(id: number): Promise<Event | undefined> {
    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne({ id });

    return event ? eventRepository.remove(event) : undefined;
  }

  async getAttendancesFromEvent(
    eventId: number,
    multipleAttendanceQuery: MultipleAttendanceQuery
  ): Promise<Attendance[] | undefined> {
    const event = await this.getEventById(eventId);

    if (event === undefined) {
      return undefined;
    }

    const attendances = await this.attendanceService.getAllAttendancesOfEvent(
      event,
      multipleAttendanceQuery
    );

    return attendances;
  }

  /**
   * Creates an Attendance entity using the event obtained from eventId and
   * the passed-in AppUser entity, then stores that Attendance entity to the
   * Attendance table.
   *
   * @param {number} eventId The id of an Event entity.
   * @param {AppUser} appUser An AppUser who is trying to sign in for the specified event.
   * @returns {Promise} A new Attendance entity.
   */
  async registerEventAttendance(
    eventId: number,
    appUser: AppUser
  ): Promise<Attendance | undefined> {
    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne({ id: eventId });
    const newAttendance = await this.attendanceService.registerAttendance(event, appUser);

    return newAttendance;
  }

  /**
   * Creates an RSVP entity using the event obtained from eventId and the
   * passed-in RSVP entity, then stores that RSVP entity to the RSVP table.
   *
   * @param {number} eventId The id of an Event entity.
   * @param {AppUser} appUser An AppUser who is trying to rsvp for the specified event.
   * @returns {Promise} A new RSVP entity.
   */
  async registerEventRSVP(eventId: number, appUser: AppUser): Promise<RSVP> {
    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne({ id: eventId });
    const newRSVP = await this.rsvpService.registerRSVP(event, appUser);

    return newRSVP;
  }
}

export const EventServiceImpl = new EventService(AttendanceServiceImpl, RSVPServiceImpl);

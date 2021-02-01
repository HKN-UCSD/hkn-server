import { Event, AppUser, Attendance, RSVP, EventStatus } from '@Entities';
import { AttendanceService, AttendanceServiceImpl } from './AttendanceService';
import { RSVPService, RSVPServiceImpl } from './RSVPService';

import { getRepository, FindManyOptions, Not } from 'typeorm';
import { MultipleAttendanceQuery, MultipleEventQuery } from '@Payloads';

export class EventService {
  constructor(private attendanceService: AttendanceService, private rsvpService: RSVPService) {}

  // Only officers can see pending events
  private buildMultipleEventQuery(
    multipleEventQuery: MultipleEventQuery,
    isOfficer: boolean
  ): FindManyOptions<Event> {
    const { pending, ready, complete } = multipleEventQuery;
    const query: FindManyOptions<Event> = {};
    const whereArr = [];

    if (isOfficer) {
      if (pending) {
        whereArr.push({ status: EventStatus.PENDING });
      }
    } else {
      /*
       * This is because Not('pending') queries include 'ready' and 'complete' statuses (so it gets anything
       * that is not 'pending'). So let's say a user is not permitted to see pending events, but say they only
       * want to see events that are ready but not events that are complete. Then, without this check,
       * Not('pending') will erroneously return both events that are ready and events that are complete,
       * even though we only wanted events that are ready. By having this check, we are making sure that
       * Not('pending') = 'ready' + 'complete' query is made only when we have both ready and complete = true in
       * query params or when we don't have either of them, since (no query params = show every event)
       * but for some users we don't want them to see pending so they'll only be seeing ready and complete with this.
       *
       * Thai, 12/22/2020
       */
      if ((ready && complete) || (!ready && !complete)) {
        whereArr.push({ status: Not(EventStatus.PENDING) });
      }
    }

    if (ready) {
      whereArr.push({ status: EventStatus.READY });
    }

    if (complete) {
      whereArr.push({ status: EventStatus.COMPLETE });
    }

    query.where = whereArr;

    return query;
  }

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
  getAllEvents(multipleEventQuery: MultipleEventQuery, isOfficer: boolean): Promise<Event[]> {
    const eventRepository = getRepository(Event);
    const query = this.buildMultipleEventQuery(multipleEventQuery, isOfficer);

    return eventRepository.find(query);
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

  async getEventAttendances(
    eventId: number,
    multipleAttendanceQuery: MultipleAttendanceQuery
  ): Promise<Attendance[] | undefined> {
    const event = await this.getEventById(eventId);

    if (event === undefined) {
      return undefined;
    }

    const attendances = await this.attendanceService.getEventAttendances(
      event,
      multipleAttendanceQuery
    );

    return attendances;
  }

  async getEventRSVPs(eventId: number): Promise<RSVP[] | undefined> {
    const event = await this.getEventById(eventId);

    if (event === undefined) {
      return undefined;
    }

    const rsvps = await this.rsvpService.getEventRSVPs(event);

    return rsvps;
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

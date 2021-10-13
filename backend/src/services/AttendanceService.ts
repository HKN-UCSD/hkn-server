import { Attendance, AppUser, AppUserRole, Event, EventType } from '@Entities';
import { MultipleAttendanceQuery, AttendanceRequest, GetAttendanceQuery } from '@Payloads';
import { AppUserService, AppUserServiceImpl } from './AppUserService';

import { getRepository, FindManyOptions, Not, IsNull } from 'typeorm';
import { differenceInMinutes, parseISO } from 'date-fns';

export class AttendanceService {
  constructor(private appUserService: AppUserService) {}

  /**
   * Builds a query object for TypeORM to filter rows when calling find() on Attendance table.
   *
   * @param event Event to get attendances from.
   * @param multipleAttendanceQuery Query parameters to filter attendances.
   * @returns {FindManyOptions<Attendance>} The query object used by TypeORM to filter rows by the query parameters.
   */
  private buildMultipleAttendanceQuery(
    event: Event,
    multipleAttendanceQuery: MultipleAttendanceQuery,
    cacheOn: boolean
  ): FindManyOptions<Attendance> {
    const { unchecked, inductee } = multipleAttendanceQuery;
    const query: FindManyOptions<Attendance> = {};

    query.where = { event: event };
    query.relations = ['attendee', 'officer', 'event'];

    if (unchecked !== undefined) {
      if (unchecked) {
        query.where = { ...query.where, officer: IsNull() };
      } else {
        query.where = { ...query.where, officer: Not(IsNull()) };
      }
    }

    if (inductee) {
      query.where = { ...query.where, isInductee: true };
    }

    if (cacheOn) {
      query.cache = true;
    }

    return query;
  }

  /**
   * Finds the Attendance entity that matches the inputted attendee and event ID.
   *
   * @param {number} attendeeId ID in the DB of the attendee.
   * @param {number} eventId ID in the DB of the event.
   * @returns {Promise} The Attendance entity matching attendee and event ID. Returns undefined if there
   * is no such entity in the DB.
   */
  async getAttendance(attendeeId: number, eventId: number): Promise<Attendance | undefined> {
    const attendanceRepository = getRepository(Attendance);
    return attendanceRepository.findOne(
      {
        attendee: { id: attendeeId } as AppUser,
        event: { id: eventId } as Event,
      },

      { relations: ['attendee', 'event'] }
    );
  }

  // TODO need to fix up induction class as well later
  /**
   * Gets all attendances of specified user. Fetches events as well.
   */
  async getUserAttendance(attendeeId: number): Promise<Attendance[] | undefined> {
    const attendanceRepository = getRepository(Attendance);

    return attendanceRepository.find({
      where: {
        attendee: { id: attendeeId } as AppUser,
      },
      relations: ['event', 'officer'],
    });
  }

  /**
   * Gets all attendances of a specified that are filtered based on passed in query parameters.
   *
   * @param {Event} event Event to get attendances from.
   * @param {MultipleAttendanceQuery} multipleAttendanceQuery Query parameters to filter attendances.
   * @returns {Promise} Array of attendances from the specified event.
   */
  async getEventAttendances(
    event: Event,
    multipleAttendanceQuery: MultipleAttendanceQuery
  ): Promise<Attendance[]> {
    const attendanceRepository = getRepository(Attendance);
    const query = this.buildMultipleAttendanceQuery(event, multipleAttendanceQuery, true);

    return attendanceRepository.find(query);
  }

  /**
   * Checks off an existing Attendance entity by adding an end time, records the
   * ID of the officer who did the check off, and calculates the amount of points
   * gained from the start time and the newly added end time.
   *
   * @param {number} eventId ID of event associated with an Attendance entity.
   * @param {number} attendeeId ID of attendee associated with an Attendance entity.
   * @param {number} officerId ID of officer who checked off the Attendance entity (if it exists)
   * @returns The checked off Attendance entity if it exists. Otherwise, returns undefined.
   */
  async checkOffAttendance(
    eventId: number,
    attendeeId: number,
    officerId: number
  ): Promise<Attendance | undefined> {
    const attendanceRepository = getRepository(Attendance);
    const attendance: Attendance = await this.getAttendance(attendeeId, eventId);

    if (attendance === undefined) {
      return undefined;
    }

    attendance.endTime = new Date();
    attendance.officer = await this.appUserService.getAppUserById(officerId);
    attendance.points = this.getAttendancePoints(attendance);

    return attendanceRepository.save(attendance);
  }

  // Precondition: event is fetched within attendance
  getAttendancePoints(attendance: Attendance): number {
    if (attendance.event.type === EventType.MENTORSHIP) {
      return 1.0;
    }

    const diffMinutes: number = differenceInMinutes(attendance.endTime, attendance.startTime);
    const numHalfHours: number = diffMinutes / 30.0;
    const points: number = Math.round(numHalfHours) / 2.0;
    if (points > 2.0) {
      return 2.0;
    }
    return points;
  }

  /**
   * Updates an existing Attendance entity matching inputted attendee and event ID with requested changes.
   * This affects the amount of points gained for that Attendance entity as it is recalculated for
   * the new start/end times of the Attendance entity. The ID of the officer who made the requested changes
   * is also recorded in the entity.
   *
   * @param {GetAttendanceQuery} attendanceQuery Query parameter object containing attendee's ID and event's ID.
   * @param {AttendanceRequest} attendanceReq The request body containing changes to be made to an existing Attendance entity.
   * @param {number} officerId ID of officer who requested the changes to be made.
   * @returns {Promise} The existing Attendance entity after the requested changes are made to it. If the entity does not
   * exist, return undefined.
   */
  async saveAttendance(
    attendanceQuery: GetAttendanceQuery,
    attendanceReq: AttendanceRequest,
    officerId: number
  ): Promise<Attendance | undefined> {
    const attendanceRepository = getRepository(Attendance);

    const { attendeeId, eventId } = attendanceQuery;
    const { startTime, endTime } = attendanceReq;
    const attendance = await this.getAttendance(attendeeId, eventId);

    if (attendance === undefined) {
      return undefined;
    }

    attendance.startTime = parseISO(startTime);
    attendance.endTime = parseISO(endTime);
    attendance.officer = await this.appUserService.getAppUserById(officerId);
    attendance.points = this.getAttendancePoints(attendance);

    return attendanceRepository.save(attendance);
  }

  /**
   * Deletes an existing Attendance entity. Does nothing and returns undefined if there is no
   * Attendance entity with matching attendee ID and event ID.
   *
   * @param {GetAttendanceQuery} attendanceQuery Query parameter object containing attendee's ID and event's ID.
   * @returns {Promise} The deleted Attendance entity if such entity exists. Otherwise returns undefined.
   */
  async deleteAttendance(attendanceQuery: GetAttendanceQuery): Promise<Attendance | undefined> {
    const attendanceRepository = getRepository(Attendance);
    const { attendeeId, eventId } = attendanceQuery;

    const attendance = await this.getAttendance(attendeeId, eventId);
    return attendance ? attendanceRepository.remove(attendance) : undefined;
  }

  /**
   * Creates a new Attendance entity, then attempts to insert it into the DB.
   *
   * @param {Event} event The Event entity whose Attendance list can be potentially modified.
   * @param {AppUser} attendee The AppUser entity registering for attendance of the specified event.
   * @returns {Promise} A new Attendance entity, but undefined for duplicate Attendance entities.
   */
  async registerAttendance(event: Event, attendee: AppUser): Promise<Attendance | undefined> {
    const attendanceRepository = getRepository(Attendance);

    const { role } = attendee;
    const attendance = { event, attendee, isInductee: role === AppUserRole.INDUCTEE };
    const newAttendance = attendanceRepository.create(attendance);
    newAttendance.startTime = new Date();

    try {
      await attendanceRepository.insert(newAttendance);
    } catch {
      return undefined;
    }

    return newAttendance;
  }
}

export const AttendanceServiceImpl = new AttendanceService(AppUserServiceImpl);

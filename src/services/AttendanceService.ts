import { Attendance, AppUser, AppUserRole, Event } from '@Entities';
import { MultipleAttendanceQuery } from '@Payloads';

import { getRepository, FindManyOptions } from 'typeorm';

interface ID {
  id: number;
}

interface AttendanceWithIDs {
  attendee: ID;
  event: ID;
  officer: ID;
  duration: number;
  isInductee: boolean;
}

export class AttendanceService {
  /**
   * Builds a query object for TypeORM to filter rows when calling find() on Attendance table.
   *
   * @param event Event to get attendances from.
   * @param multipleAttendanceQuery Query parameters to filter attendances.
   * @returns {FindManyOptions<Attendance>} The query object used by TypeORM to filter rows by the query parameters.
   */
  private buildMultipleAttendanceQuery(
    event: Event,
    multipleAttendanceQuery: MultipleAttendanceQuery
  ): FindManyOptions<Attendance> {
    const { unchecked, inductee } = multipleAttendanceQuery;
    const query: FindManyOptions<Attendance> = {};

    query.where = { event: event };
    query.relations = ['attendee', 'officer', 'event'];

    if (unchecked) {
      query.where = { ...query.where, officer: null };
    }

    if (inductee) {
      query.where = { ...query.where, isInductee: true };
    }

    return query;
  }

  /**
   * Gets all attendances of a specified that are filtered based on passed in query parameters.
   *
   * @param {Event} event Event to get attendances from.
   * @param {MultipleAttendanceQuery} multipleAttendanceQuery Query parameters to filter attendances.
   * @returns {Promise} Array of attendances from the specified event.
   */
  async getAllEventAttendances(
    event: Event,
    multipleAttendanceQuery: MultipleAttendanceQuery
  ): Promise<Attendance[]> {
    const attendanceRepository = getRepository(Attendance);
    const query = this.buildMultipleAttendanceQuery(event, multipleAttendanceQuery);

    return attendanceRepository.find(query);
  }

  async saveAttendance(
    attendance: Attendance | AttendanceWithIDs
  ): Promise<Attendance | undefined> {
    const attendanceRepository = getRepository(Attendance);

    return attendanceRepository.save(attendance);
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

    try {
      await attendanceRepository.insert(newAttendance);
    } catch {
      return undefined;
    }

    return newAttendance;
  }
}

export const AttendanceServiceImpl = new AttendanceService();

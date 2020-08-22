import { Attendance, AppUser, AppUserRole, Event } from '@Entities';

import { getRepository } from 'typeorm';

export class AttendanceService {
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

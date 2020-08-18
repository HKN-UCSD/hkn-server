import { Attendance, AppUser, AppUserRole, Event } from '@Entities';
import { AttendanceRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AttendanceService {
  private attendanceRepository: Repository<Attendance>;

  constructor(@inject(AttendanceRepositoryToken) attendanceRepository: Repository<Attendance>) {
    this.attendanceRepository = attendanceRepository;
  }

  /**
   * Creates a new Attendance entity, then attempts to insert it into the DB.
   *
   * @param {Event} event The Event entity whose Attendance list can be potentially modified.
   * @param {AppUser} attendee The AppUser entity registering for attendance of the specified event.
   * @returns {Promise} A new Attendance entity, but undefined for duplicate Attendance entities.
   */
  async registerAttendance(event: Event, attendee: AppUser): Promise<Attendance | undefined> {
    const { role } = attendee;
    const attendance = { event, attendee, isInductee: role === AppUserRole.INDUCTEE };
    const newAttendance = this.attendanceRepository.create(attendance);

    try {
      await this.attendanceRepository.insert(newAttendance);
    } catch {
      return undefined;
    }

    return newAttendance;
  }
}

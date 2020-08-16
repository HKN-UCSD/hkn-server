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

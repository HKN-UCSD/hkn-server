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

  createAttendance(event: Event, attendee: AppUser): Attendance {
    const { role } = attendee;
    const attendance = { event, attendee, isInductee: role === AppUserRole.INDUCTEE };
    return this.attendanceRepository.create(attendance);
  }

  async saveAttendance(attendance: Attendance): Promise<Attendance> {
    return this.attendanceRepository.save(attendance);
  }
}

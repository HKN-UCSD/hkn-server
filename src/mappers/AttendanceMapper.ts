import { AttendanceResponse } from '@Payloads';
import { Attendance } from '@Entities';
import { AttendanceService } from '@Services';
import { AttendanceRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AttendanceMapper {
  private attendanceRepository: Repository<Attendance>;
  private attendanceService: AttendanceService;

  constructor(
    @inject(AttendanceRepositoryToken) attendanceRepository: Repository<Attendance>,
    @inject(AttendanceService) attendanceService: AttendanceService
  ) {
    this.attendanceRepository = attendanceRepository;
    this.attendanceService = attendanceService;
  }

  entityToResponse(attendance: Attendance): AttendanceResponse {
    const plainAttendance: Object = classToPlain(attendance);
    const attendanceResponse: AttendanceResponse = plainToClass(
      AttendanceResponse,
      plainAttendance
    );

    return attendanceResponse;
  }
}

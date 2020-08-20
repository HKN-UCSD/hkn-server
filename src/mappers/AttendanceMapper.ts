import { AttendanceResponse } from '@Payloads';
import { Attendance } from '@Entities';

import { classToPlain, plainToClass } from 'class-transformer';

export class AttendanceMapper {
  /**
   * Converts an Attendance entity to an AttendanceResponse payload and returns the
   * newly created response payload to the caller.
   *
   * @param {Attendance} attendance The Attendance entity to be converted to an AttendanceResponse.
   * @returns {AttendanceResponse} An AttendanceResponse instance.
   */
  entityToResponse(attendance: Attendance): AttendanceResponse {
    const plainAttendance: Object = classToPlain(attendance);
    const attendanceResponse: AttendanceResponse = plainToClass(
      AttendanceResponse,
      plainAttendance
    );

    return attendanceResponse;
  }
}

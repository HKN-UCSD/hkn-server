import {
  AttendanceApi,
  AttendanceControllerDeleteAttendanceRequest,
  AttendanceControllerUpdateAttendanceTimesRequest
} from './api/apis/AttendanceApi';
import { AttendanceResponse } from './api/models';
import ApiConfigStore from './ApiConfigStore';
import { Configuration } from './api/runtime';

/*
 * Since attendance points are derived from the start and end times of an Attendance entity, changing the start and
 * end times of an Attendance entity means changing the amount of points gained for that Attendance entity.
 */
export async function updateAttendanceTimes(attendeeId: number, eventId: number, startTime: string, endTime: string) {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const attendanceApi: AttendanceApi = new AttendanceApi(apiConfig);
  const request: AttendanceControllerUpdateAttendanceTimesRequest = {
    attendeeId,
    eventId,
    attendanceRequest: {
      startTime,
      endTime
    }
  };

  return attendanceApi.attendanceControllerUpdateAttendanceTimes(request);
}

export async function deleteAttendance(
  attendeeId: number,
  eventId: number
): Promise<AttendanceResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const attendanceApi: AttendanceApi = new AttendanceApi(apiConfig);
  const request: AttendanceControllerDeleteAttendanceRequest = {
    attendeeId,
    eventId,
  };

  return attendanceApi.attendanceControllerDeleteAttendance(request);
}

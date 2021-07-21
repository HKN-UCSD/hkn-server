import {
  AttendanceApi,
  AttendanceControllerDeleteAttendanceRequest,
} from './api/apis/AttendanceApi';
import { AttendanceResponse } from './api/models';

import ApiConfigStore from './ApiConfigStore';
import { Configuration } from './api/runtime';

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

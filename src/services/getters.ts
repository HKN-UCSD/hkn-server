import { AppUserService } from './AppUserService';
import { AttendanceService } from './AttendanceService';
import { EventService } from './EventService';
import { RSVPService } from './RSVPService';

export const getAppUserService = (): AppUserService => {
  return new AppUserService();
};

export const getAttendanceService = (): AttendanceService => {
  return new AttendanceService();
};

export const getEventService = (): EventService => {
  return new EventService();
};

export const getRSVPService = (): RSVPService => {
  return new RSVPService();
};

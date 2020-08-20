import { AppUserMapper } from './AppUserMapper';
import { AttendanceMapper } from './AttendanceMapper';
import { EventMapper } from './EventMapper';
import { RSVPMapper } from './RSVPMapper';

export const getAppUserMapper = (): AppUserMapper => {
  return new AppUserMapper();
};

export const getAttendanceMapper = (): AttendanceMapper => {
  return new AttendanceMapper();
};

export const getEventMapper = (): EventMapper => {
  return new EventMapper();
};

export const getRSVPMapper = (): RSVPMapper => {
  return new RSVPMapper();
};

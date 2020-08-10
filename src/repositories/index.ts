import { Event, AppUser, InductionClass, Attendance, RSVP, InducteeStat } from '@Entities';
import { Repository, getRepository } from 'typeorm';

export const EventRepositoryToken = 'EventRepository';
export const EventRepositoryFactory = (): Repository<Event> => getRepository(Event);

export const AppUserRepositoryToken = 'AppUserRepository';
export const AppUserRepositoryFactory = (): Repository<AppUser> => getRepository(AppUser);

export const InductionClassRepositoryToken = 'InductionClassRepository';
export const InductionClassRepositoryFactory = (): Repository<InductionClass> =>
  getRepository(InductionClass);

export const AttendanceRepositoryToken = 'AttendanceRepositoryToken';
export const AttendanceRepositoryFactory = (): Repository<Attendance> => getRepository(Attendance);

export const RSVPRepositoryToken = 'RSVPRepositoryToken';
export const RSVPRepositoryFactory = (): Repository<RSVP> => getRepository(RSVP);

export const InducteeStatRepositoryToken = 'InducteeStatRepositoryToken';
export const InducteeStatRepositoryFactory = (): Repository<InducteeStat> =>
  getRepository(InducteeStat);

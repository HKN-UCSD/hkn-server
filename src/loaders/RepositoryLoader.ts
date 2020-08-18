import { container } from 'tsyringe';
import {
  EventRepositoryToken,
  EventRepositoryFactory,
  AppUserRepositoryToken,
  AppUserRepositoryFactory,
  AttendanceRepositoryToken,
  AttendanceRepositoryFactory,
  RSVPRepositoryToken,
  RSVPRepositoryFactory,
} from '@Repositories';
import { Event, AppUser, Attendance, RSVP } from '@Entities';
import { Repository } from 'typeorm';

export function loadRepositories(): void {
  container.register<Repository<Event>>(EventRepositoryToken, {
    useFactory: EventRepositoryFactory,
  });

  container.register<Repository<AppUser>>(AppUserRepositoryToken, {
    useFactory: AppUserRepositoryFactory,
  });

  container.register<Repository<Attendance>>(AttendanceRepositoryToken, {
    useFactory: AttendanceRepositoryFactory,
  });

  container.register<Repository<RSVP>>(RSVPRepositoryToken, {
    useFactory: RSVPRepositoryFactory,
  });
}

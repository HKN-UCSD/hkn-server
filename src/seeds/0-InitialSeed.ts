import {
  AppUser,
  Event,
  EventType,
  EventStatus,
  Attendance,
  RSVP,
  InductionClass,
} from '@Entities';
import { MigrationInterface, QueryRunner, EntityManager } from 'typeorm';

import { formatISO } from 'date-fns';

const appUsers = [
  {
    firstName: 'Olivia',
    lastName: 'Olsen',
    email: 'officer@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2020',
    role: 'officer',
    availabilities: [
      { start: '2020-11-14 11:08:43.741', end: '2020-11-14 11:08:43.741' },
      { start: '2020-11-14 14:00:00.000', end: '2020-11-14 15:00:00.000' },
      { start: '2020-11-14 14:00:00.000', end: '2020-11-14 15:00:00.000' },
    ],
  },
  {
    firstName: 'Mac',
    lastName: 'Miller',
    email: 'member@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2021',
    role: 'member',
  },
  {
    firstName: 'Irene',
    lastName: 'Iverson',
    email: 'inductee@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2022',
    role: 'inductee',
  },
];

const inductionClass = {
  quarter: 'FA20',
  name: 'Alpha Beta',
  startDate: '2020-08-30',
  endDate: '2020-12-30',
};

const events = [
  {
    name: 'Laser Tag',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2020-08-30T18:00:00+00:00',
    endDate: '2020-08-30T19:00:00+00:00',
    type: EventType.SOCIAL,
    status: EventStatus.COMPLETE,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
  {
    name: 'Resume Critique',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2020-08-31T18:00:00+00:00',
    endDate: '2020-08-31T19:00:00+00:00',
    type: EventType.PROFESSIONAL,
    status: EventStatus.COMPLETE,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
  {
    name: 'Mentor 1:1',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2020-09-01T18:00:00+00:00',
    endDate: '2020-09-01T19:00:00+00:00',
    type: EventType.MENTORSHIP,
    status: EventStatus.COMPLETE,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
];

const startTime = new Date();
const endTime = new Date();
endTime.setHours(startTime.getHours() + 1);

const attendances = [
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 1 },
    startTime: formatISO(startTime),
    endTime: formatISO(endTime),
    isInductee: true,
    points: 1,
  },
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 2 },
    startTime: formatISO(startTime),
    endTime: formatISO(endTime),
    isInductee: true,
    points: 2,
  },
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 3 },
    startTime: formatISO(startTime),
    endTime: formatISO(endTime),
    isInductee: true,
    points: 1.5,
  },
];

const rsvps = [
  {
    event: { id: 1 },
    appUser: { id: 2 },
  },
];

export class InitialSeed1598821691476 implements MigrationInterface {
  name = 'InitialSeed1598821691476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager: EntityManager = queryRunner.manager;

    // InductionClass
    const inductionClassEntity: InductionClass = manager.create(InductionClass, inductionClass);
    await manager.insert(InductionClass, inductionClassEntity);

    // AppUsers
    const appUserPromises = appUsers.map(appUser => {
      const appUserEntity: AppUser = manager.create(AppUser, appUser);
      appUserEntity.inductionClass = inductionClassEntity;
      return manager.insert(AppUser, appUserEntity);
    });
    await Promise.all(appUserPromises);

    // Events
    const eventPromises = events.map(async event => {
      const eventEntity: Event = manager.create(Event, event);
      return manager.insert(Event, eventEntity);
    });
    await Promise.all(eventPromises);

    // Attendance
    const attendancePromises = attendances.map(async attendance =>
      manager.insert(Attendance, attendance)
    );
    await Promise.all(attendancePromises);

    // RSVP
    const rsvpPromises = rsvps.map(async rsvp => manager.insert(RSVP, rsvp));
    await Promise.all(rsvpPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from attendance`);
    await queryRunner.query(`DELETE from rsvp`);
    await queryRunner.query(`DELETE from event_hosts_app_user`);
    await queryRunner.query(`DELETE from app_user`);
    await queryRunner.query(`DELETE from induction_class`);
  }
}

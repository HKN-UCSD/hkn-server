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

const appUsers = [
  {
    firstName: 'Olivia',
    lastName: 'Olsen',
    email: 'officer@ucsd.edu',
    major: 'Computer Science',
    graduationYear: '2020',
    role: 'officer',
    availabilities: [
      { start: '2020-11-14 11:00:00.000', end: '2020-11-14 12:00:00.000' },
      { start: '2020-11-15 14:00:00.000', end: '2020-11-15 16:00:00.000' },
      { start: '2020-11-17 15:00:00.000', end: '2020-11-17 18:00:00.000' },
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
    availabilities: [
      { start: '2020-11-15 12:00:00.000', end: '2020-11-15 15:00:00.000' },
      { start: '2020-11-16 11:00:00.000', end: '2020-11-16 12:00:00.000' },
      { start: '2020-11-17 16:00:00.000', end: '2020-11-14 17:00:00.000' },
    ],
  },
];

const inductionClasses = [
  {
    quarter: 'FA20',
    name: 'Alpha Beta',
    startDate: '2020-09-28',
    endDate: '2020-12-20',
    interviewDates: [new Date('05 October 2011 14:48 UTC'), new Date('06 October 2011 14:48 UTC')],
    year: '2020',
  },
  {
    quarter: 'WI21',
    name: 'Beta Gamma',
    startDate: '2021-01-04',
    endDate: '2021-03-21',
    interviewDates: [new Date('05 October 2011 14:48 UTC'), new Date('06 October 2011 14:48 UTC')],
    year: '2020',
  },
  {
    quarter: 'SP21',
    name: 'Gamma Delta',
    startDate: '2021-03-24',
    endDate: '2021-06-11',
    interviewDates: [new Date('05 October 2011 14:48 UTC'), new Date('06 October 2011 14:48 UTC')],
    year: '2020',
  },
  {
    quarter: 'SP20',
    name: 'Omega Alpha',
    startDate: '2020-03-25',
    endDate: '2020-06-13',
    interviewDates: [new Date('05 October 2011 14:48 UTC'), new Date('06 October 2011 14:48 UTC')],
    year: '2019',
  },
];

const events = [
  {
    name: 'Laser Tag',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2020-03-25T18:00:00+00:00',
    endDate: '2020-03-25T19:00:00+00:00',
    type: EventType.SOCIAL,
    status: EventStatus.COMPLETE,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
  {
    name: 'Resume Critique',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2020-12-19T18:00:00+00:00',
    endDate: '2020-12-19T19:00:00+00:00',
    type: EventType.PROFESSIONAL,
    status: EventStatus.COMPLETE,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
  {
    name: 'Mentor 1:1',
    description: 'We have free pizza!',
    location: 'In n Out',
    startDate: '2021-02-23T18:00:00+00:00',
    endDate: '2021-02-23T19:00:00+00:00',
    type: EventType.MENTORSHIP,
    status: EventStatus.COMPLETE,
    hosts: [{ id: 1 }], // hardcoded to assume officer is id 1
  },
];

const attendances = [
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 1 },
    startTime: '2020-03-25T18:00:00+00:00',
    endTime: '2020-03-25T19:00:00+00:00',
    isInductee: true,
    points: 1,
  },
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 2 },
    startTime: '2020-12-19T18:00:00+00:00',
    endTime: '2020-12-19T19:00:00+00:00',
    isInductee: true,
    points: 2,
  },
  {
    attendee: { id: 3 },
    officer: { id: 1 },
    event: { id: 3 },
    startTime: '2021-02-23T18:00:00+00:00',
    endTime: '2021-02-23T19:00:00+00:00',
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
    const inductionClassPromises = inductionClasses.map(async inductionClass =>
      manager.insert(InductionClass, inductionClass)
    );
    await Promise.all(inductionClassPromises);
    const induct_class = inductionClasses.find(x => x.quarter == 'WI21');
    const inductionClassEntity: InductionClass = manager.create(InductionClass, induct_class);

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

import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { AppUser } from './AppUser';
import { Attendance } from './Attendance';
import { Event } from './Event';

// later do some grouping by quarter
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('appUser.id', 'user')
      .addSelect('SUM(attendance.duration)', 'points')
      .addSelect(
        "SUM(CASE WHEN event.type = 'professional' THEN 1 ELSE 0 END)::int::bool",
        'hasProfessionalRequirement'
      )
      .addSelect(
        "SUM(CASE WHEN event.type = 'mentorship' THEN 1 ELSE 0 END)::int::bool",
        'hasMentorshipRequirement'
      )
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .innerJoin(Event, 'event', 'event.id = attendance.event')
      .groupBy('appUser.id')
      .where('attendance.isInductee'),
})
export class InducteePointsView {
  @ViewColumn()
  user: AppUser;

  @ViewColumn()
  points: number;

  @ViewColumn()
  hasProfessionalRequirement: boolean;

  @ViewColumn()
  hasMentorshipRequirement: boolean;
}

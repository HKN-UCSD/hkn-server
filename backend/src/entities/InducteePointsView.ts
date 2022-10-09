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
      .addSelect('appUser.email', 'email')
      .addSelect('SUM(attendance.points)', 'points')
      .addSelect(
        "CASE WHEN( SUM(CASE WHEN event.type = 'professional' THEN attendance.points ELSE 0 END)::float ) >= 1 THEN TRUE ELSE FALSE END",
        'hasProfessionalRequirement'
      )
      .addSelect(
        "CASE WHEN( SUM(CASE WHEN event.type = 'mentorship' THEN attendance.points ELSE 0 END)::float ) >= 1 THEN TRUE ELSE FALSE END",
        'hasMentorshipRequirement'
      )
      .addSelect(
        "CASE WHEN( SUM(CASE WHEN event.type = 'technical' THEN attendance.points ELSE 0 END)::float ) >= 1 THEN TRUE ELSE FALSE END",
        'hasTechnicalRequirement'
      )
      .addSelect(
        "CASE WHEN( SUM(CASE WHEN event.type = 'social' THEN attendance.points ELSE 0 END)::float ) >= 2 THEN TRUE ELSE FALSE END",
        'hasSocialRequirement'
      )
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .innerJoin(Event, 'event', 'event.id = attendance.event')
      .groupBy('appUser.id')
      .where('attendance.isInductee'),
})
export class InducteePointsView {
  @ViewColumn()
  user: number;

  @ViewColumn()
  inductionClassQuarter: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  points: number;

  @ViewColumn()
  hasProfessionalRequirement: boolean;

  @ViewColumn()
  hasMentorshipRequirement: boolean;

  @ViewColumn()
  hasTechnicalRequirement: boolean;

  @ViewColumn()
  hasSocialRequirement: boolean;
}

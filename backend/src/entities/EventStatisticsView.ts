import { ViewEntity, Connection, ViewColumn, getManager } from 'typeorm';
import { AppUser } from './AppUser';
import { Attendance } from './Attendance';
import { Event } from './Event';

// SELECT type,
//   sum(CASE WHEN role = 'guest' THEN 1 END) as guest,
//   sum(CASE WHEN role = 'inductee' THEN 1 END) as inductee,
//   sum(CASE WHEN role = 'member' THEN 1 END) as member,
//   sum(CASE WHEN role = 'officer' THEN 1 END) as officer
// FROM(
//   SELECT app_user.role, "eventId", type
// FROM attendance
// INNER JOIN app_user
// ON "attendeeId" = app_user.id
// INNER JOIN event
// ON "eventId" = event.id
// WHERE "startDate" >= '2021/10/25 00:14:18' AND "endDate" <= '2021/10/25 00:14:18'
// ) as tmp GROUP BY type;

export enum EventType {
  SOCIAL = 'social',
  TECHNICAL = "technical",
  PROFESSIONAL = "professional",
}

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('tmp.type', 'type')
      .addSelect(
        "SUM(CASE WHEN role ='guest' THEN 1 END)",
        'guests'
      )
      .addSelect(
        "SUM(CASE WHEN role ='inductee' THEN 1 END)",
        'inductees'
      )
      .addSelect(
        "SUM(CASE WHEN role ='member' THEN 1 END)",
        'members'
      )
      .addSelect(
        "SUM(CASE WHEN role ='officer'THEN 1 END)",
        'officers'
      )
      .from(subQuery => {
        return subQuery
          .select('appUser.role', 'role')
          .addSelect('event.eventId', 'eventId')
          .addSelect('event.type', 'type')
          .from(Attendance, 'attendance')
          .innerJoin(AppUser, 'appUser', 'attendance.attendeeId = appUser.id')
          .innerJoin(Event, 'event', 'attendance.eventId = event.id')
          .where('event.startDate >= 2021/10/25 00:14:18 AND event.endDate <= 2021/10/25 00:14:18')
      }, "tmp")
      .from(AppUser, 'appUser')
      .groupBy('tmp.type')
})

export class EventStatisticsView {
  @ViewColumn()
  type: number;

  @ViewColumn()
  guests: number;

  @ViewColumn()
  inductees: number;

  @ViewColumn()
  members: number;

  @ViewColumn()
  officers: number;
}
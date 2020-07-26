import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Event } from './Event';
import { Attendance } from './Attendance';
import { AppUser } from './AppUser';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('appUser.id', 'id')
      .addSelect('SUM(attendance.duration)', 'inductionPoints')
      .addSelect("COUNT(event.type = 'professional') > 0", 'professional')
      .addSelect("COUNT(event.type = 'mentorship')", 'mentorship') // fix this later
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .innerJoin(Event, 'event', 'event.id = attendance.event')
      .groupBy('appUser.id'),
})
export class InducteeStats {
  @ViewColumn()
  id: number;

  @ViewColumn()
  inductionPoints: number;

  @ViewColumn()
  professional: boolean;

  @ViewColumn()
  mentorship: boolean;
}

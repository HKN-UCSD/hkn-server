import { ViewEntity, Connection, ViewColumn, OneToOne } from 'typeorm';
import { Event } from './Event';
import { Attendance } from './Attendance';
import { AppUser } from './AppUser';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('appUser.id', 'user')
      .addSelect('SUM(attendance.duration)', 'inductionPoints')
      .addSelect("COUNT(event.type = 'professional') > 0", 'professional')
      .addSelect("COUNT(event.type = 'mentorship') > 0", 'mentorship')
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .innerJoin(Event, 'event', 'event.id = attendance.event')
      .groupBy('appUser.id'),
})
export class InductionStats {
  @ViewColumn()
  user: AppUser;

  @ViewColumn()
  inductionPoints: number;

  @ViewColumn()
  professional: boolean;

  @ViewColumn()
  mentorship: boolean;
}

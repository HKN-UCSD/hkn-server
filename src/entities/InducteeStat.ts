import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Event } from './Event';
import { Attendance } from './Attendance';
import { AppUser } from './AppUser';
import { InductionClass } from './InductionClass';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('appUser.id', 'user')
      .addSelect('appUser.inductionClass', 'inductionClass')
      .addSelect('SUM(attendance.duration)', 'inductionPoints')
      .addSelect("COUNT(event.type = 'professional') > 0", 'professional')
      .addSelect("COUNT(event.type = 'mentorship') > 0", 'mentorship')
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .innerJoin(Event, 'event', 'event.id = attendance.event')
      .where('attendance.isInductee = true')
      .groupBy('appUser.id'),
})
export class InducteeStat {
  @ViewColumn()
  user: AppUser;

  @ViewColumn()
  inductionClass: InductionClass;

  @ViewColumn()
  inductionPoints: number;

  @ViewColumn()
  professional: boolean;

  @ViewColumn()
  mentorship: boolean;
}

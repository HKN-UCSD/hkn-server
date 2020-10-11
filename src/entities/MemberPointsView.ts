import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { AppUser } from './AppUser';
import { Attendance } from './Attendance';

// later do some grouping by quarter
// honestly we could maybe make this a query
// idk we'll figure it out someday
// - Godwin Sept 12th 2021 :sadge:
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('appUser.id', 'user')
      .addSelect('SUM(attendance.points)', 'points')
      .from(AppUser, 'appUser')
      .innerJoin(Attendance, 'attendance', 'appUser.id = attendance.attendee')
      .groupBy('appUser.id')
      .where('NOT attendance.isInductee'),
})
export class MemberPointsView {
  @ViewColumn()
  user: AppUser;

  @ViewColumn()
  points: number;
}

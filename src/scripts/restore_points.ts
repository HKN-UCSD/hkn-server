import { loadORM } from '../loaders';
import { Attendance, AppUser, Event } from '../entities';
import { AttendanceServiceImpl } from '../services';
import { getRepository } from 'typeorm';

import fs from 'fs';

loadORM().then(async () => {
  const attendanceRepo = getRepository(Attendance);
  const userRepo = getRepository(AppUser);
  const eventRepo = getRepository(Event);
  const attendances = await attendanceRepo.find({ relations: ['attendee', 'event'] });

  // calculate attendance points
  for (const attendance of attendances) {
    if (!attendance.endTime && attendance.event.id != 13) {
      continue;
    }

    // these two events need to be fixed up
    if (attendance.event.id == 13 || (attendance.event.id == 33 && attendance.isInductee)) {
      attendance.startTime = (attendance.event.startDate as unknown) as Date;
      attendance.endTime = (attendance.event.endDate as unknown) as Date;
    }

    const points = AttendanceServiceImpl.getAttendancePoints(attendance);
    attendance.points = points;
    console.log(
      `Processing ${attendance.attendee.firstName} for event ${attendance.event.id}: ${attendance.points} points`
    );

    await attendanceRepo.save(attendance);
  }

  // do stuff from g sheets
  fs.readFile('./src/scripts/attendance.json', 'utf8', async (_, data) => {
    const rawAttendances = JSON.parse(data).attendances;
    for (const a of rawAttendances) {
      const user = await userRepo.findOne({ where: { email: a.email } });
      const officer = await userRepo.findOne({ where: { id: 16 } });
      if (!user) {
        console.log(`Skipping ${a.email}`);
        continue;
      }

      if (!a.id) {
        continue;
      }

      const event = await eventRepo.findOne({ where: { id: a.id } });
      if (!event) {
        console.log(a.id);
        continue;
      }

      const attendance = new Attendance();
      attendance.event = event;
      attendance.officer = officer;
      attendance.attendee = user;
      attendance.points = a.hours;

      // o look typescript is very interesting :)
      attendance.startTime = (event.startDate as unknown) as Date;
      attendance.endTime = (event.endDate as unknown) as Date;
      attendance.isInductee = user.role === 'inductee';

      attendanceRepo.save(attendance);
    }
  });
});

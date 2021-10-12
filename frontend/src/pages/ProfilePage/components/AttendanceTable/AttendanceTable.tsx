import React from 'react';
import { parseISO, format } from 'date-fns';

import { Table } from '@SharedComponents';
import { AttendanceResponse, AppUserEventResponse } from '@Services/api/models';

const columns = [
  { title: 'Event', field: 'event' },
  { title: 'Date', field: 'eventDate' },
  { title: 'Type', field: 'eventType' },
  { title: 'Points', field: 'points' },
  { title: 'Checking Officer', field: 'officerName' },
];

export interface AttendanceTableProps {
  attendances: Array<AttendanceResponse>;
}

export function AttendanceTable({ attendances }: AttendanceTableProps) {
  const attendanceData = attendances.map(attendance => {
    const eventType = attendance.event.type;
    const formattedEventType =
      eventType.charAt(0).toUpperCase() + eventType.slice(1);

    const eventDate = format(parseISO(attendance.event.startDate), 'PP');
    let officerName = '';

    if (attendance.officer != null) {
      const {
        firstName: officerFirstName,
        lastName: officerLastName,
      }: AppUserEventResponse = attendance.officer;

      officerName = `${officerFirstName} ${officerLastName}`;
    }

    return {
      event: attendance.event.name,
      eventType: formattedEventType,
      eventDate,
      points: attendance.points,
      officerName,
    };
  });

  return <Table title='' columns={columns} data={attendanceData} />;
}

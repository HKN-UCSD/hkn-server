import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

import { useInterval } from '@Hooks';
import { Table } from '@SharedComponents';
import {
  AttendanceResponse,
  MultipleAttendanceResponse,
  AppUserEventResponse,
} from '@Services/api/models';

interface AttendanceTableProps {
  getAttendances: () => Promise<MultipleAttendanceResponse>;
}

const attendanceResponseToAttendanceRow = (attendance: AttendanceResponse) => {
  const {
    firstName: attendeeFirstName,
    lastName: attendeeLastName,
    email: attendeeEmail,
    role,
  }: AppUserEventResponse = attendance.attendee;
  const fullName = `${attendeeFirstName} ${attendeeLastName}`;
  const attendeeRole = role.charAt(0).toUpperCase() + role.slice(1); // Capitalization

  // TODO: Remove type casting on startTime when startTime on payload is changed to string and move map logic to a separate function
  const startTimeString = format(
    parseISO((attendance.startTime as unknown) as string),
    'p'
  );

  const endTimeString =
    attendance.endTime == null
      ? ''
      : format(parseISO((attendance.endTime as unknown) as string), 'p');

  let officerName = '';
  if (attendance.officer != null) {
    const {
      firstName: officerFirstName,
      lastName: officerLastName,
    }: AppUserEventResponse = attendance.officer;

    officerName = `${officerFirstName} ${officerLastName}`;
  }

  const attendeePoints = attendance.points;

  const attendanceToDisplay = {
    ...attendance,
    name: fullName,
    email: attendeeEmail,
    attendeeRole,
    startTimeString,
    endTimeString,
    officerName,
    attendeePoints,
  };

  return attendanceToDisplay;
};

function AttendanceTable(props: AttendanceTableProps) {
  const { getAttendances } = props;
  const [attendances, setAttendances] = useState<AttendanceResponse[]>([]);

  useEffect(() => {
    const getEventAttendances = async () => {
      const { attendances: incomingAttendances } = await getAttendances();
      setAttendances(incomingAttendances);
    };

    getEventAttendances();
  }, [getAttendances]);

  useInterval({
    callback: async () => {
      const { attendances: incomingAttendances } = await getAttendances();
      setAttendances(incomingAttendances);
    },
    delay: 1000,
  });

  const columns = [
    { title: 'Full Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'attendeeRole' },
    { title: 'Start Time', field: 'startTimeString' },
    { title: 'End Time', field: 'endTimeString' },
    { title: 'Checking Officer', field: 'officerName' },
    { title: 'Points', field: 'points' },
  ];

  const attendanceData = attendances.map(attendance =>
    attendanceResponseToAttendanceRow(attendance)
  );

  return (
    <Table
      columns={columns}
      data={attendanceData}
      title=''
      options={{ exportButton: true }}
    />
  );
}

export default AttendanceTable;

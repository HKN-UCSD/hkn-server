import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

import AttendanceDeleteButton from '../buttons/AttendanceDeleteButton';
import { Loading } from '@SharedComponents';
import { useInterval } from '@Hooks';
import { Button, Table } from '@SharedComponents';
import {
  AttendanceResponse,
  MultipleAttendanceResponse,
} from '@Services/api/models';

interface CheckOffTableProps {
  getAttendances: () => Promise<MultipleAttendanceResponse>;
  checkOffAttendance: (
    eventId: number,
    attendeeId: number
  ) => Promise<AttendanceResponse>;
  eventId: number;
}

function CheckOffTable(props: CheckOffTableProps) {
  const { getAttendances, checkOffAttendance, eventId } = props;
  const [attendances, setAttendances] = useState<AttendanceResponse[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const columns = [
    { title: 'Full Name', field: 'name' },
    { title: 'Role', field: 'attendeeRole' },
    { title: 'Start Time', field: 'startTimeString' },
    {
      title: 'Check Off',
      render: (rowData: AttendanceResponse) => (
        <Button
          primary
          positive
          onClick={() => checkOffAttendance(eventId, rowData.attendee.id)}
        >
          Check Off
        </Button>
      ),
    },
    {
      title: '',
      render: ({ attendee: { id } }: AttendanceResponse) => (
        <AttendanceDeleteButton attendeeId={id} eventId={eventId} />
      ),
    },
  ];

  useEffect(() => {
    const getEventAttendances = async () => {
      const { attendances: incomingAttendances } = await getAttendances();
      setAttendances(incomingAttendances);
      setIsLoading(false);
    };

    getEventAttendances();
  }, [getAttendances]);

  useInterval({
    callback: async () => {
      const { attendances: incomingAttendances } = await getAttendances();
      setAttendances(incomingAttendances);
      setIsLoading(false);
    },
    delay: 1000,
  });

  const attendanceData = attendances.map(attendance => {
    const { startTime, attendee } = attendance;
    const { firstName, lastName, role } = attendee;

    const fullName = `${firstName} ${lastName}`;
    // TODO: Remove type casting on startTime when startTime on payload is changed to string and move map logic to a separate function
    const startTimeString = format(
      parseISO((startTime as unknown) as string),
      'p'
    );
    const attendeeRole = role.charAt(0).toUpperCase() + role.slice(1);

    const attendanceToDisplay = {
      ...attendance,
      name: fullName,
      startTimeString,
      attendeeRole,
    };

    return attendanceToDisplay;
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Table
      columns={columns}
      data={attendanceData}
      title=''
      options={{ exportButton: true }}
    />
  );
}

export default CheckOffTable;

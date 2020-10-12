import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

import { useInterval } from '../../../../hooks/index';

import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
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

  const columns = [
    { title: 'Full Name', field: 'name' },
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
  ];

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

  // TODO: Remove type casting on startTime when startTime on payload is changed to string and move map logic to a separate function
  return (
    <>
      {OfficerRenderPermission(Table)({
        columns,
        data: attendances.map(attendance => {
          const fullName = `${attendance.attendee.firstName} ${attendance.attendee.lastName}`;
          const startTimeString = format(
            parseISO((attendance.startTime as unknown) as string),
            'PPP h:mm aaaa'
          );
          const attendanceToDisplay = {
            ...attendance,
            name: fullName,
            startTimeString,
          };

          return attendanceToDisplay;
        }),
        title: 'Check Off Table',
      })}
    </>
  );
}

export default CheckOffTable;

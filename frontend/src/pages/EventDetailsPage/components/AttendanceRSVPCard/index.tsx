import React from 'react';

import CheckOffTable from '../CheckOffTable';
import AttendanceTable from '../AttendanceTable';
import RSVPTable from '../RSVPTable';

import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
import {
  CardWithVerticalTabs,
  CardWithVerticalTabsProps,
} from '@SharedComponents/cards/CardWithVerticalTabs';
import {
  getEventAttendances,
  checkOffAttendance,
  getEventRSVPs,
} from '@Services/EventService';

interface AttendanceRSVPCardProps {
  eventID: number;
}

function AttendanceRSVPCard({ eventID }: AttendanceRSVPCardProps) {
  const checkOffTable = (
    <CheckOffTable
      getAttendances={() => getEventAttendances(eventID, true, false)}
      checkOffAttendance={checkOffAttendance}
      eventId={eventID}
    />
  );
  const attendanceTable = (
    <AttendanceTable
      getAttendances={() => getEventAttendances(eventID, false, false)}
    />
  );
  const rsvpTable = <RSVPTable getRSVPs={() => getEventRSVPs(eventID)} />;

  const tabs: CardWithVerticalTabsProps['items'] = [
    { title: 'Check Off', element: checkOffTable },
    { title: 'Attendance', element: attendanceTable },
    { title: 'RSVP', element: rsvpTable },
  ];

  return OfficerRenderPermission(CardWithVerticalTabs)({
    items: tabs,
  });
}

export default AttendanceRSVPCard;

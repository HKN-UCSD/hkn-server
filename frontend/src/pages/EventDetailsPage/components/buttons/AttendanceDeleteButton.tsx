import React from 'react';

import { ButtonWithConfirmationModal } from '@SharedComponents';
import { deleteAttendance } from '@Services/AttendanceService';

interface AttendanceDeleteButtonProps {
  attendeeId: number;
  eventId: number;
}

const AttendanceDeleteButton = ({ attendeeId, eventId }: AttendanceDeleteButtonProps) => {
  const confirmButtonProps = {
    name: 'Yes',
    onClick: () => deleteAttendance(attendeeId, eventId),
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    positive: true,
  };

  return (
    <ButtonWithConfirmationModal
      title='Delete this attendance entry?'
      contentText='Do you want to delete this attendance entry permanently?'
      confirmButtonProps={confirmButtonProps}
      cancelButtonProps={cancelButtonProps}
      name='Delete'
      secondary
      negative
    />
  );
};

export default AttendanceDeleteButton;
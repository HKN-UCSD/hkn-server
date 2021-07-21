import React from 'react';

import { ButtonWithConfirmationModal } from '@SharedComponents';
import { deleteAttendance } from '@Services/AttendanceService';

interface AttendanceDeleteButtonProps {
  attendeeId: number;
  eventId: number;
}

const AttendanceDeleteButton = ({
  attendeeId,
  eventId,
}: AttendanceDeleteButtonProps) => {
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
      confirmationModalProps={{
        title: 'Delete this attendance entry?',
        contentText:
          'This attendance entry will be deleted permanently from our database.',
        confirmButtonProps,
        cancelButtonProps,
      }}
      name='Delete'
      primary
      negative
    />
  );
};

export default AttendanceDeleteButton;

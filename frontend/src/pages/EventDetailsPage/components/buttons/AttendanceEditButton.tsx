import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { formatISO, parseISO } from 'date-fns';

import { ButtonWithConfirmationModal } from '@SharedComponents';
import { updateAttendanceTimes } from '@Services/AttendanceService';
import { Grid } from '@material-ui/core';

interface AttendanceEditButtonProps {
  attendeeId: number;
  eventId: number;
  startTime: string;
  endTime: string;
}

const AttendanceEditButton = ({
  attendeeId,
  eventId,
  startTime,
  endTime,
}: AttendanceEditButtonProps) => {
  const [currStartTime, setCurrStartTime] = useState(parseISO(startTime));
  const [currEndTime, setCurrEndTime] = useState(parseISO(endTime));

  const confirmButtonProps = {
    name: 'Yes',
    onClick: () =>
      updateAttendanceTimes(
        attendeeId,
        eventId,
        formatISO(currStartTime),
        formatISO(currEndTime)
      ),
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    onClick: () => {
      setCurrStartTime(parseISO(startTime));
      setCurrEndTime(parseISO(endTime));
    },
    positive: true,
  };

  const handleStartTimeChange = (date: Date | null) => {
    const startTimeToSet = date === null ? currStartTime : date;
    setCurrStartTime(startTimeToSet);
  };

  const handleEndTimeChange = (date: Date | null) => {
    const endTimeToSet = date === null ? currEndTime : date;
    setCurrEndTime(endTimeToSet);
  };

  return (
    <ButtonWithConfirmationModal
      confirmationModalProps={{
        title: 'Update attendance entry',
        contentText: '',
        confirmButtonProps,
        cancelButtonProps,
      }}
      name='Edit'
      primary
      positive
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction='row' spacing={2}>
          <Grid item>
            <DateTimePicker
              label='Start Time'
              value={currStartTime}
              onChange={handleStartTimeChange}
            />
          </Grid>

          <Grid item>
            <DateTimePicker
              label='End Time'
              value={currEndTime}
              onChange={handleEndTimeChange}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </ButtonWithConfirmationModal>
  );
};

export default AttendanceEditButton;

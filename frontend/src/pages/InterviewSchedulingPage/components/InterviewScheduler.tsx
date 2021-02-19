import React from 'react';
import ScheduleSelector from 'react-schedule-selector';

interface InterviewSchedulerProps {
  numDays?: number;
  minTime?: number;
  maxTime?: number;
  startDate?: Date;
  selectedSchedule: Date[];
  selectedScheduleCallback?: (arg: Date[]) => void;
}

function InterviewScheduler({
  numDays = 5,
  minTime = 10,
  maxTime = 18,
  startDate = new Date(),
  selectedSchedule,
  selectedScheduleCallback = () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
}: InterviewSchedulerProps): JSX.Element {
  return (
    <ScheduleSelector
      selection={selectedSchedule}
      numDays={numDays}
      minTime={minTime}
      maxTime={maxTime}
      startDate={startDate}
      onChange={selectedScheduleCallback}
      dateFormat='ddd M/D'
    />
  );
}

export default InterviewScheduler;

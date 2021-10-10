import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AttendanceTableProps, AttendanceTable } from './AttendanceTable';

export default {
  title: 'ProfilePage/AttendanceTable',
  component: AttendanceTable,
} as Meta;

const Template: Story<AttendanceTableProps> = args => {
  const { attendances } = args;
  return <AttendanceTable attendances={attendances} />;
};

export const SampleAttendanceTable = Template.bind({});
SampleAttendanceTable.args = {
  attendances: [
    {
      points: 1,
      attendee: 1,
      isInductee: true,
      startTime: '2020-11-13T01:00:00.000Z',
      event: {
        type: 'professional',
        startDate: '2020-11-13T01:00:00.000Z',
        name: 'Tech Talk',
      },
    },
    {
      points: 1.5,
      attendee: 1,
      isInductee: true,
      startTime: '2020-11-13T01:00:00.000Z',
      event: {
        type: 'social',
        startDate: '2020-11-13T01:00:00.000Z',
        name: 'Pizza',
      },
    },
  ],
};

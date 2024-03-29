import React from 'react';
import PropTypes from 'prop-types';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar as CalendarToolbar,
  ViewSwitcher,
  TodayButton,
  DateNavigator,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

// color of events based on status
const resources = [
  {
    fieldName: 'status',
    instances: [
      { id: 'complete', color: '#b3cce6' },
      { id: 'pending', color: '#e6b3cc' },
      { id: 'ready', color: '#f28c8c' },
    ],
  },
];

const mainResource = 'status';

const AppointmentWithClick = handleClick => props => (
  <Appointments.Appointment
    {...props}
    // eslint-disable-next-line react/prop-types
    onClick={() => handleClick(props.data)}
  />
);

AppointmentWithClick.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function Calendar({ events, handleEventClick }) {
  return (
    <Scheduler data={events} firstDayOfWeek={1}>
      <ViewState defaultCurrentViewName='Week' />
      <DayView cellDuration={60} startDayHour={9} endDayHour={22} />
      <WeekView cellDuration={60} startDayHour={9} endDayHour={22} />
      <MonthView cellDuration={60} startDayHour={9} endDayHour={22} />
      <CalendarToolbar />
      <DateNavigator />
      <TodayButton />
      <ViewSwitcher />
      <Appointments
        appointmentComponent={AppointmentWithClick(appointment =>
          handleEventClick(appointment)
        )}
      />
      <Resources data={resources} mainResourceName={mainResource} />
    </Scheduler>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEventClick: PropTypes.func.isRequired,
};

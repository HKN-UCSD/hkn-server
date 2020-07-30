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
} from '@devexpress/dx-react-scheduler-material-ui';

import { ViewState } from '@devexpress/dx-react-scheduler';

const AppointmentWithClick = handleClick => props => (
  <Appointments.Appointment
    {...props}
    onClick={() => handleClick(props.data)}
  />
);

export default function Calendar({ events, handleEventClick }) {
  return (
    <Scheduler data={events}>
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
    </Scheduler>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEventClick: PropTypes.func.isRequired,
};

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

export default function Calendar({ events, handleEventClick, resources }) {
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
      <Resources data={resources} mainResourceName='status' />
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
  resources: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

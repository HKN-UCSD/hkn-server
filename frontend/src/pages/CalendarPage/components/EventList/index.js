import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO, compareAsc } from 'date-fns';

import { Table } from '@SharedComponents';

const eventDateComparator = (dateTimeA, dateTimeB) => {
  const parsedDateTimeA = parseISO(dateTimeA);
  const parsedDateTimeB = parseISO(dateTimeB);

  return compareAsc(parsedDateTimeA, parsedDateTimeB);
};

const columns = [
  { title: 'Event Name', field: 'title' },
  {
    title: 'Start Time',
    field: 'startDateString',
    customSort: (eventA, eventB) =>
      eventDateComparator(eventA.startDate, eventB.startDate),
  },
  {
    title: 'End Time',
    field: 'endDateString',
    customSort: (eventA, eventB) =>
      eventDateComparator(eventA.endDate, eventB.endDate),
  },
];

function EventList({ events, handleEventClick }) {
  // show up an event Card which clicked by passing callback

  const listEvents = [];
  for (let i = 0; i < events.length; i += 1) {
    const listEvent = {
      id: events[i].id,
      title: events[i].title,
      name: events[i].title,
      startDateString: format(parseISO(events[i].startDate), 'PPPP p'),
      endDateString: format(parseISO(events[i].endDate), 'PPPP p'),
      location: events[i].location,
      startDate: events[i].startDate,
      endDate: events[i].endDate,
    };
    listEvents.push(listEvent);
  }

  return (
    <Table
      columns={columns}
      data={listEvents}
      title='Events'
      onRowClick={(event, rowData) => handleEventClick(rowData)}
      options={{
        filtering: true,
        sorting: true,
      }}
    />
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string,
      id: PropTypes.number.isRequired,
    })
  ),
  handleEventClick: PropTypes.func.isRequired,
};

EventList.defaultProps = {
  events: [{ location: '' }],
};

export default EventList;

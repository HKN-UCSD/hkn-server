import React from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../Table';

const dateTimeSort = (dateTimeA, dateTimeB) => {
  return moment(dateTimeA).diff(moment(dateTimeB));
};

const columns = [
  { title: 'Event Name', field: 'title' },
  {
    title: 'Start Time',
    field: 'startDateString',
    customSort: (eventA, eventB) => {
      const { startDate: startDateTimeA } = eventA;
      const { startDate: startDateTimeB } = eventB;

      return dateTimeSort(startDateTimeA, startDateTimeB);
    },
  },
  {
    title: 'End Time',
    field: 'endDateString',
    customSort: (eventA, eventB) => {
      const { endDate: endDateTimeA } = eventA;
      const { endDate: endDateTimeB } = eventB;

      return dateTimeSort(endDateTimeA, endDateTimeB);
    },
  },
];

function EventList({ events, handleEventClick }) {
  // show up an event Card which clicked by passing callback

  const listEvents = [];
  for (let i = 0; i < events.length; i += 1) {
    const listEvent = {
      id: events[i].id,
      title: events[i].title,
      startDateString: moment(events[i].startDate).format(
        'dddd, MMMM Do YYYY, h:mm:ss a'
      ),
      endDateString: moment(events[i].endDate).format(
        'dddd, MMMM Do YYYY, h:mm:ss a'
      ),
      venue: events[i].venue,
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
      venue: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEventClick: PropTypes.func.isRequired,
};

export default EventList;

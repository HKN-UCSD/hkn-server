import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../Table';
import styles from './styles';

const columns = [
  { title: 'Event Name', field: 'title' },
  { title: 'start Time', field: 'startDate' },
  { title: 'end Time', field: 'endDate' },
];

function EventList({ events, handleEventClick }) {
  // show up an event Card which clicked by passing callback

  const listEvents = [];
  for (let i = 0; i < events.length; i += 1) {
    const listEvent = {
      title: events[i].title,
      startDate: moment(events[i].startDate).format(
        'dddd, MMMM Do YYYY, h:mm:ss a'
      ),
      endDate: moment(events[i].endDate).format(
        'dddd, MMMM Do YYYY, h:mm:ss a'
      ),
    };
    listEvents.push(listEvent);
  }

  return (
    <div style={{ marginTop: '0px' }}>
      <Table
        columns={columns}
        data={listEvents}
        title='Events'
        actions={[
          {
            // hidden: true,
            icon: '',
            tooltip: 'see more',
            onClick: (event, rowData) => {
              handleEventClick(rowData);
            },
          },
        ]}
        options={{ filtering: true }}
      />
    </div>
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

export default withStyles(styles)(EventList);

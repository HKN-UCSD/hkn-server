import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Table from '../Table';
import styles from './styles';

const columns = [
  { title: 'Event Name', field: 'name' },
  { title: 'Time', field: 'time' },
];

const users = [
  { name: 'event1', time: '1/1' },
  { name: 'event2', time: '1/2' },
];

function EventList() {
  return (
    <div style={{ marginTop: '50px' }}>
      <Table
        columns={columns}
        data={users}
        title='Events'
        // detailPanel={data => {
        //   return <div />;
        // }}
        options={{ filtering: true }}
      />
    </div>
  );
}

EventList.propTypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(EventList);

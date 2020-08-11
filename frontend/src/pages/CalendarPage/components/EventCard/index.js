import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import styles from './styles';

function EventCard({ event, classes }) {
  return (
    <>
      {event && (
        <Card>
          <CardHeader title={event.title} />
          <CardContent>
            <Typography variant='h6' color='textSecondary' gutterBottom>
              {format(parseISO(event.startDate), 'PP')} -{' '}
              {format(parseISO(event.startDate), 'p')} to{' '}
              {format(parseISO(event.endDate), 'p')}
            </Typography>
            <Box className={classes.locationContainer}>
              <RoomIcon color='disabled' />
              <Typography color='textSecondary'>{event.venue}</Typography>
            </Box>
            <Button
              variant='outlined'
              color='primary'
              to={`/events/${event.id}`}
              component={Link}
            >
              See More
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(EventCard);

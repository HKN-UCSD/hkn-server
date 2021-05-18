import React from 'react';
import { Typography, Box, Button, Grid, Modal, Fade } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import styles from './styles';

import { Card, GetLocation } from '@SharedComponents';

function EventCard({ event, onClose, classes }) {
  // Listens to whether an event is selected or not from Calendar parent comp
  const isOpen = event ? true : false;

  const ref = React.createRef();

  const ModalContent = React.forwardRef(() => (
    <Fade in={isOpen}>
      <Grid container
        justify="center"
        alignItems="center"
      >
        <Card title={event.name}>
          <Typography variant='h6' color='textSecondary' gutterBottom>
            {format(parseISO(event.startDate), 'PP')} -{' '}
            {format(parseISO(event.startDate), 'p')} to{' '}
            {format(parseISO(event.endDate), 'p')}
          </Typography>
          <Box className={classes.locationContainer}>
            <RoomIcon color='disabled' />
            <GetLocation location={event.location} />
          </Box>
          <Button
            variant='outlined'
            color='primary'
            to={`/events/${event.id}`}
            component={Link}
          >
            See More
          </Button>
        </Card>
      </Grid>
    </Fade>
  ));

  return (
    <>
      {event && (
        <Modal
          open={isOpen}
          onClose={onClose}
          ref={ref}
          className={classes.modal}
        >
          <ModalContent />
        </Modal>
      )}
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    id: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func,
};

EventCard.defaultProps = {
  event: {
    location: '',
  },
};

export default withStyles(styles)(EventCard);

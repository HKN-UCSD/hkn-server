import React from 'react';
import { Typography, Box, Button, Modal } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';


import styles from './styles';

import { Card, GetLocation } from '@SharedComponents';


function EventCard({ event, onClose, classes}) {
  // Listens to whether an event is selected or not from Calendar parent comp
  let open = event ? true : false; // is this good practice??

  const ref = React.createRef(); // is this how I use refs??

  const ModalContent = React.forwardRef((props, ref) =>        
    <Fade in={open}>    
      <div className="classes.modalDiv">
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
      </div>
    </Fade> 
  );

  return (
    <>
      {event && (
      <Modal
        open={open}
        onClose={onClose}
        ref={ref}
        className={classes.modal}
      >
        <ModalContent></ModalContent>
      </Modal>)}
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
};

EventCard.defaultProps = {
  event: {
    location: '',
  },
};

export default withStyles(styles)(EventCard);

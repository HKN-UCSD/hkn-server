import React from 'react';
import { Typography, Box, Button, Grid, Modal, Fade } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { OfficerRenderPermission } from '@HOCs/RenderPermissions';

import styles from './styles';

import { Card, GetLocation } from '@SharedComponents';

function EventCard({ event, onClose, classes, updateStatus }) {
  // Listens to whether an event is selected from Calendar parent comp
  const isOpen = event !== null;

  // Fixes error that Modal component needed a reference and an inner forwardRef
  const ref = React.createRef();

  const ModalContent = React.forwardRef(() => (
    <Fade in={isOpen}>
      <Grid container justify='center' alignItems='center'>
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
          <Grid>
            {OfficerRenderPermission(Button)({
              secondary: true,
              disabled: event.status === 'pending',
              children: 'Pending',
              onClick: () => { updateStatus('pending');},
            })}
            {OfficerRenderPermission(Button)({
              secondary: true,
              disabled: event.status === 'complete',
              children: 'Complete',
              onClick: () => { updateStatus('complete');},
            })}
            {OfficerRenderPermission(Button)({
              secondary: true,
              disabled: event.status === 'ready',
              children: 'Ready',
              onClick: () => { updateStatus('ready');},
            })}
          </Grid>
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
    status: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func,
  updateStatus: PropTypes.func
};

EventCard.defaultProps = {
  event: {
    location: '',
  },
};

export default withStyles(styles)(EventCard);

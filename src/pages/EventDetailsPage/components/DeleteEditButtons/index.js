import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { Button, ButtonWithConfirmationModal } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { deleteEvent } from '@Services/EventService';

const DeleteEditButtons = props => {
  const { eventId } = props;

  const handleDeleteEvent = eventToDeleteId => {
    deleteEvent(eventToDeleteId)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteEvent(eventId);
  };

  const confirmButtonProps = {
    name: 'Yes',
    onClick: handleConfirmDelete,
    to: ROUTES.CALENDAR,
    component: Link,
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    positive: true,
  };

  return (
    <Grid container justify='flex-end' spacing={1}>
      <Grid item>
        <ButtonWithConfirmationModal
          title='Delete this event?'
          contentText='Do you want to delete this event permanently?'
          confirmButtonProps={confirmButtonProps}
          cancelButtonProps={cancelButtonProps}
          name='Delete'
          secondary
          negative
        />
      </Grid>

      <Grid item>
        <Button
          primary
          positive
          to={`/events/${eventId}/edit`}
          component={Link}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

DeleteEditButtons.propTypes = {
  eventId: PropTypes.number.isRequired,
};

export default DeleteEditButtons;

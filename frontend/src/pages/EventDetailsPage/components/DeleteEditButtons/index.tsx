import React from 'react';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';

import { Button, ButtonWithConfirmationModal } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { deleteEvent } from '@Services/EventService';

interface DeleteEditButtonsProps {
  eventId: number;
}

function DeleteEditButtons({ eventId }: DeleteEditButtonsProps) {
  const history = useHistory();

  const handleDeleteEvent = (eventToDeleteId: number) => {
    deleteEvent(eventToDeleteId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteEvent(eventId);
    history.push(ROUTES.CALENDAR);
  };

  const confirmButtonProps = {
    name: 'Yes',
    onClick: handleConfirmDelete,
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
          confirmationModalProps={{
            title: 'Delete this event?',
            contentText:
              'This event will be deleted permanently from our database.',
            confirmButtonProps,
            cancelButtonProps,
          }}
          name='Delete'
          secondary
          negative
        />
      </Grid>

      <Grid item>
        <Button
          primary
          positive
          onClick={() => history.push(`/events/${eventId}/edit`)}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}

export default DeleteEditButtons;

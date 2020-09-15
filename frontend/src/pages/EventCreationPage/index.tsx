import React from 'react';
import { useHistory } from 'react-router';
import { Card } from '@material-ui/core';

import { EventCreationForm } from './components/EventCreationForm';
import useStyles from './styles';

import * as ROUTES from '@Constants/routes';
import { createEvent } from '@Services/EventService';
import { EventRequest } from '@Services/api/models';

function EventCreationPage(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (
    values: EventRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    const createdEvent = await createEvent(values);
    const { id } = createdEvent;

    setSubmitting(false);
    history.push(`/events/${id}`);
  };

  const handleCancel = () => {
    history.push(ROUTES.CALENDAR);
  };

  return (
    <Card className={classes.root}>
      <EventCreationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Card>
  );
}

export default EventCreationPage;

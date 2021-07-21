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
    const submission = {
      ...values,
      hosts: values.hosts.map(host => {
        return { id: host.id };
      }),
      fbURL: values.fbURL === '' ? undefined : values.fbURL,
      canvaURL: values.canvaURL === '' ? undefined : values.canvaURL,
    };

    const createdEvent = await createEvent(submission);
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

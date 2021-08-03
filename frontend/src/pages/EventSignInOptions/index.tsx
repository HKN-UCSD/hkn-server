import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';

import * as ROUTES from '@Constants/routes';
import { getEventById } from '@Services/EventService';
import { EventResponse } from '@Services/api/models';

interface EventID {
  id: string;
}

function EventSignInOptions(): JSX.Element {
  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);
  const [eventInfo, setEventInfo] = useState<EventResponse | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(eventId);
      setEventInfo(eventResponse);
    };

    getEvent();
  }, [eventId]);

  const signInURL = eventInfo == null ? ' ' : eventInfo.signInURL;

  const classes = useStyles();

  return (
    <div style={{ margin: '200px' }}>
      <div className={classes.buttonsDiv}>
        <h2 className={classes.h2}>
          Are you a current HKN inductee or member?
        </h2>

        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          size='large'
          to={ROUTES.SIGN_IN}
          component={Link}
        >
          Inductee / Member Log In
        </Button>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          size='large'
          to={signInURL}
          component={Link}
        >
          Guest Sign In Form
        </Button>
      </div>
    </div>
  );
}

export default EventSignInOptions;

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';

import useStyles from './styles';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { getEventById } from '@Services/EventService';
import { EventResponse } from '@Services/api/models';

interface EventID {
  id: string;
}

function EventSignInOptionsPage(): JSX.Element {
  const [eventInfo, setEventInfo] = useState<EventResponse | null>(null);
  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);

  const history = useHistory();
  const signInURL = eventInfo == null ? '' : eventInfo.signInURL;
  const classes = useStyles();

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(eventId);
      setEventInfo(eventResponse);
    };

    getEvent();
  }, [eventId]);

  return (
    <div style={{ margin: '200px' }}>
      <div className={classes.buttonsDiv}>
        <h2 className={classes.h2}>
          Are you a current HKN inductee or member?
        </h2>

        <Button
          className={classes.button}
          primary
          positive
          onClick={() => {
            history.push(ROUTES.SIGN_IN);
          }}
        >
          Inductee / Member Log In
        </Button>
        <Button
          className={classes.button}
          primary
          positive
          onClick={() => {
            history.push(signInURL);
          }}
        >
          Guest Sign In Form
        </Button>
      </div>
    </div>
  );
}

export default EventSignInOptionsPage;

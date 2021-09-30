import React from 'react';
import { useParams, useHistory } from 'react-router';

import useStyles from './styles';

import { Button } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

interface EventID {
  id: string;
}

function EventSignInOptionsPage(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();

  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);

  const eventDetailsURL = ROUTES.EVENT_DETAILS_WITH_ID(eventId);
  const guestSignInURL = ROUTES.EVENT_SIGN_IN_WITH_ID(eventId);

  return (
    <div>
      <div className={classes.buttonsDiv}>
        <h2 className={classes.h2}>
          Are you a current HKN inductee or member?
        </h2>

        <Button
          className={classes.button}
          primary
          positive
          onClick={() => {
            history.push(eventDetailsURL);
          }}
        >
          Inductee / Member Log In
        </Button>
        <Button
          className={classes.button}
          primary
          positive
          onClick={() => {
            history.push(guestSignInURL);
          }}
        >
          Guest Sign In Form
        </Button>
      </div>
    </div>
  );
}

export default EventSignInOptionsPage;

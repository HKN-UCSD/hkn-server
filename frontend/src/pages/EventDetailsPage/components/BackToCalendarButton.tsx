import React from 'react';
import { useHistory } from 'react-router';

import * as ROUTES from '@Constants/routes';
import { Button } from '@SharedComponents';

export default function BackToCalendarButton() {
  const history = useHistory();

  return (
    <Button
      secondary
      negative
      onClick={() => {
        history.push(ROUTES.CALENDAR);
      }}
    >
      Back To Calendar
    </Button>
  );
}

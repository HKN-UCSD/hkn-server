import React from 'react';
import { useParams, useHistory } from 'react-router';

import { UserContext } from '@Contexts';
import * as ROUTES from '@Constants/routes';

interface EventID {
  id: string;
}

/**
 * This page is reached by scanning an event's QR Code.
 * From here, redirects to two different pages whether the user is signed in or not.
 */
function QrCodeIntermediatePage(): JSX.Element {
  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);
  const history = useHistory();

  return (
    <UserContext.Consumer>
      {userClaims => {
        if (userClaims != null) {
          const { userRoles } = userClaims;

          if (userRoles != null) {
            // user is signed in, route to event details page (placeholder)
            history.push(ROUTES.EVENT_DETAILS_WITH_ID(eventId));
          } else {
            history.push(ROUTES.EVENT_SIGN_IN_OPTIONS);
          }
        } else {
          history.push(ROUTES.EVENT_SIGN_IN_OPTIONS);
        }

        return <></>;
      }}
    </UserContext.Consumer>
  );
}

export default QrCodeIntermediatePage;

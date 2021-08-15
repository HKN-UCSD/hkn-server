/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '@Contexts';
import * as ROUTES from '@Constants/routes';
import { NavBar } from '@SharedComponents';

const RoutingAuthorization = allowedRoles => WrappedComponent => props => {
  return (
    <UserContext.Consumer>
      {userClaims => {
        if (userClaims != null) {
          const { userRoles } = userClaims;

          if (userRoles != null) {
            for (let i = 0; i < userRoles.length; i += 1) {
              if (allowedRoles.includes(userRoles[i])) {
                return (
                  <NavBar>
                    <WrappedComponent {...props} />
                  </NavBar>
                );
              }
            }
          }
        }

        // Route to account sign in page if user does not have allowed roles
        const { location } = props;
        const { pathname, search } = location;
        const signInRoute = `${ROUTES.SIGN_IN}?path=${pathname}${search}`;

        return <Redirect to={signInRoute} />;
      }}
    </UserContext.Consumer>
  );
};

export default RoutingAuthorization;

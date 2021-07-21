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

        return <Redirect to={ROUTES.SIGN_IN} />;
      }}
    </UserContext.Consumer>
  );
};

export default RoutingAuthorization;

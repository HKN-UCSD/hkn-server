import React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthUserContext } from '../contexts';
import * as ROUTES from '../constants/routes';
import NavBar from '../components/NavBar';

const RoutingByContextAuth = allowedRoles => WrappedComponent => props => {
  return (
    <AuthUserContext.Consumer>
      {userClaims => {
        if (userClaims != null) {
          for (let i = 0; i < userClaims.length; i++) {
            if (allowedRoles.includes(userClaims[i])) {
              return (
                <NavBar>
                  <WrappedComponent {...props} />
                </NavBar>
              );
            }
          }
        }

        return <Redirect to={ROUTES.SIGN_IN} />;
      }}
    </AuthUserContext.Consumer>
  );
};

export default RoutingByContextAuth;

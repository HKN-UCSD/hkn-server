import React from 'react';
import { Redirect } from 'react-router-dom';

import { ClaimsSingleton } from '../services/claims';
import * as ROUTES from '../constants/routes';
import NavBar from '../components/NavBar';

// Fancy function currying where Authorization returns an HOC that takes in
// Wrapped Component and roles. If any role in roles is also in allowedRoles,
// then WrappedComponent will be rendered wrapped in a NavBar.
const Authorization = allowedRoles => WrappedComponent => props => {
  const claims = ClaimsSingleton.getClaims();
  if (claims != null) {
    for (let i = 0; i < claims.length; i += 1) {
      if (allowedRoles.includes(claims[i])) {
        return (
          <NavBar>
            <WrappedComponent {...props} />
          </NavBar>
        );
      }
    }
  }

  return <Redirect to={ROUTES.SIGN_IN} />;
};

export default Authorization;

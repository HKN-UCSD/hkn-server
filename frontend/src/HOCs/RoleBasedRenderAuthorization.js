import React from 'react';

import { ClaimsSingleton } from '../services/claims';

const RoleBasedRenderAuthorization = allowedRoles => ComponentToRender => props => {
  const claims = ClaimsSingleton.getClaims();
  if (claims != null) {
    for (let i = 0; i < claims.length; i += 1) {
      if (allowedRoles.includes(claims[i])) {
        return <ComponentToRender {...props} />;
      }
    }
  }
  return <></>;
};

export default RoleBasedRenderAuthorization;

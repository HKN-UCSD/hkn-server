import React from 'react';

import { AuthUserContext } from '../contexts';

const RenderByContextAuth = allowedRoles => ComponentToRender => props => {
  return (
    <AuthUserContext.Consumer>
      {userClaims => {
        if (userClaims != null) {
          for (let i = 0; i < userClaims.length; i += 1) {
            if (allowedRoles.includes(userClaims[i])) {
              return <ComponentToRender {...props} />;
            }
          }
        }

        return <></>;
      }}
    </AuthUserContext.Consumer>
  );
};

export default RenderByContextAuth;

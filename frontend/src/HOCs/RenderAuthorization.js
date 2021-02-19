import React from 'react';

import { UserContext } from '@Contexts';

const RenderAuthorization = allowedRoles => ComponentToRender => props => {
  return (
    <UserContext.Consumer>
      {userClaims => {
        if (userClaims != null) {
          const { userRoles } = userClaims;

          if (userRoles != null) {
            for (let i = 0; i < userRoles.length; i += 1) {
              if (allowedRoles.includes(userRoles[i])) {
                return <ComponentToRender {...props} />;
              }
            }
          }
        }

        return <></>;
      }}
    </UserContext.Consumer>
  );
};

export default RenderAuthorization;

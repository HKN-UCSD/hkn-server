import React from 'react';

// we might make more contexts...
// eslint-disable-next-line import/prefer-default-export
export interface UserContextValues {
  userId: string;
  userRoles: string[];
}

export const UserContext = React.createContext<UserContextValues | null>(null);

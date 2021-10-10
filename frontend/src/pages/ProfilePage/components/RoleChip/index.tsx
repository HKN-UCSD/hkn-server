import React from 'react';
import { Chip } from '@material-ui/core';

import { AppUserResponseRoleEnum } from '@Services/api/models';

export interface RoleChipProps {
  role: AppUserResponseRoleEnum;
}

// maybe we should have the colors not hard coded in the future
function getChipStyle(role: AppUserResponseRoleEnum) {
  switch (role) {
    case AppUserResponseRoleEnum.Admin:
      return { backgroundColor: '#C9EB84' };
    case AppUserResponseRoleEnum.Officer:
      return { backgroundColor: '#F9A03F' };
    case AppUserResponseRoleEnum.Member:
      return { backgroundColor: '#EC98AB' };
    case AppUserResponseRoleEnum.Inductee:
      return { backgroundColor: '#BBDEF0' };
    default:
      return {};
  }
}

export function RoleChip({ role }: RoleChipProps) {
  if (role.length === 0) {
    return <></>;
  }

  return (
    <Chip
      style={getChipStyle(role)}
      label={role[0].toUpperCase() + role.substring(1)}
    />
  );
}

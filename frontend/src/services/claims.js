const getRolesFromClaims = claims => {
  const keys = Object.keys(claims);
  const roleClaims = [];

  if (keys.includes('officer')) {
    roleClaims.push('officer');
  }

  if (keys.includes('member')) {
    roleClaims.push('member');
  }

  if (keys.includes('inductee')) {
    roleClaims.push('inductee');
  }

  return roleClaims;
};

const isOfficer = userContext => {
  const { userRoles } = userContext;

  return userRoles.includes('officer');
};

const isMember = userContext => {
  const { userRoles } = userContext;

  return userRoles.includes('officer') || userRoles.includes('member');
};

const isInductee = userContext => {
  const { userRoles } = userContext;

  return (
    userRoles.includes('officer') ||
    userRoles.includes('member') ||
    userRoles.includes('inductee')
  );
};

export { getRolesFromClaims, isOfficer, isMember, isInductee };

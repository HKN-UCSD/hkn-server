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

const isAnOfficer = userContext => {
  const { userRoles } = userContext;

  return userRoles.includes('officer');
};

const isAMember = userContext => {
  const { userRoles } = userContext;

  return userRoles.includes('officer') || userRoles.includes('member');
};

const isAnInductee = userContext => {
  const { userRoles } = userContext;

  return (
    userRoles.includes('officer') ||
    userRoles.includes('member') ||
    userRoles.includes('inductee')
  );
};

export { getRolesFromClaims, isAnOfficer, isAMember, isAnInductee };

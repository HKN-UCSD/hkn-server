const isAdmin = userContext => {
  const { userRoles } = userContext;

  return userRoles.includes('admin');
};

const isOfficer = userContext => {
  const { userRoles } = userContext;

  return userRoles.includes('admin') || userRoles.includes('officer');
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

export { isAdmin, isOfficer, isMember, isInductee };

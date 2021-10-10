import { CURR_USER_ID_ALIAS } from '@Constants/routes';

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

const isUnauthedOrNonOfficer = (userContext, userIdFromURL) => {
  const { userId } = userContext;

  if (
    !isOfficer(userContext) &&
    userIdFromURL !== CURR_USER_ID_ALIAS &&
    userIdFromURL !== userId
  ) {
    return true;
  }

  return false;
};

export { isAdmin, isOfficer, isMember, isInductee, isUnauthedOrNonOfficer };

import * as USER_ROLES from '../../../constants/userRoles';
import AuthMiddleware from '../base/authentication.middleware';

const officerAuth = AuthMiddleware([USER_ROLES.OFFICER]);
const memberAuth = AuthMiddleware([USER_ROLES.OFFICER, USER_ROLES.MEMBER]);

export { officerAuth, memberAuth };

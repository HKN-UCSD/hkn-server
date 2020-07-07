import * as USER_ROLES from '../../constants/userRoles';
import AuthMiddleware from './base/authentication.middleware';

const officerAuth = AuthMiddleware([USER_ROLES.OFFICER]);

export default officerAuth;

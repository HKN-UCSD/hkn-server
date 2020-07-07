import * as USER_ROLES from '../../constants/userRoles';
import AuthMiddleware from './base/authentication.middleware';

const memberAuth = AuthMiddleware([USER_ROLES.OFFICER, USER_ROLES.MEMBER]);

export default memberAuth;

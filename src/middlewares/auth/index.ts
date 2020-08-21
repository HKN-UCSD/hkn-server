import { container } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthFactory } from './AuthFactory';

export const AdminAuthMiddleware = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.ADMIN);

export const OfficerAuthMiddleware = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.OFFICER);

export const MemberAuthMiddleware = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.MEMBER);

export const InducteeAuthMiddleware = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.INDUCTEE);

export const GuestAuthMiddleware = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.GUEST);

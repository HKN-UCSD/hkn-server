import { container } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthFactory } from './AuthFactory';

export const AdminAuthFactory = container.resolve(AuthFactory).getAuthMiddleware(AppUserRole.ADMIN);

export const OfficerAuthFactory = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.OFFICER);

export const MemberAuthFactory = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.MEMBER);

export const InducteeAuthFactory = container
  .resolve(AuthFactory)
  .getAuthMiddleware(AppUserRole.INDUCTEE);

export const GuestAuthFactory = container.resolve(AuthFactory).getAuthMiddleware(AppUserRole.GUEST);

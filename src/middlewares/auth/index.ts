import { container } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthMiddlewareFactory } from './AuthMiddlewareFactory';

export const AdminAuthMiddleware = container
  .resolve(AuthMiddlewareFactory)
  .getAuthMiddleware(AppUserRole.ADMIN);

export const OfficerAuthMiddleware = container
  .resolve(AuthMiddlewareFactory)
  .getAuthMiddleware(AppUserRole.OFFICER);

export const MemberAuthMiddleware = container
  .resolve(AuthMiddlewareFactory)
  .getAuthMiddleware(AppUserRole.MEMBER);

export const InducteeAuthMiddleware = container
  .resolve(AuthMiddlewareFactory)
  .getAuthMiddleware(AppUserRole.INDUCTEE);

export const GuestAuthMiddleware = container
  .resolve(AuthMiddlewareFactory)
  .getAuthMiddleware(AppUserRole.GUEST);

import { container } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthorizationMiddleware } from './AuthorizationMiddleware';
import { AuthorizationFactory } from './AuthorizationFactory';

export const AdminAuthorizationFactory = (): AuthorizationMiddleware =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.ADMIN);

export const OfficerAuthorizationFactory = (): AuthorizationMiddleware =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.OFFICER);

export const MemberAuthorizationFactory = (): AuthorizationMiddleware =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.MEMBER);

export const InducteeAuthorizationFactory = (): AuthorizationMiddleware =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.INDUCTEE);

export const GuestAuthorizationFactory = (): AuthorizationMiddleware =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.GUEST);

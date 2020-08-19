import { container } from 'tsyringe';

import { AppUserRole } from '@Entities';
import { AuthorizationFactory } from './AuthorizationFactory';

export const AdminAuthorizationFactory = () =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.ADMIN);

export const OfficerAuthorizationFactory = () =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.OFFICER);

export const MemberAuthorizationFactory = () =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.MEMBER);

export const InducteeAuthorizationFactory = () =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.INDUCTEE);

export const GuestAuthorizationFactory = () =>
  container.resolve(AuthorizationFactory).getAuthorizationMiddleware(AppUserRole.GUEST);

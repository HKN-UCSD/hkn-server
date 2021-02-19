import { AppUserRole } from '@Entities';
import { AuthMiddlewareFactoryImpl } from './AuthMiddlewareFactory';

export const AdminAuthMiddleware = AuthMiddlewareFactoryImpl.getAuthMiddleware(AppUserRole.ADMIN);

export const OfficerAuthMiddleware = AuthMiddlewareFactoryImpl.getAuthMiddleware(
  AppUserRole.OFFICER
);

export const MemberAuthMiddleware = AuthMiddlewareFactoryImpl.getAuthMiddleware(AppUserRole.MEMBER);

export const InducteeAuthMiddleware = AuthMiddlewareFactoryImpl.getAuthMiddleware(
  AppUserRole.INDUCTEE
);

export const GuestAuthMiddleware = AuthMiddlewareFactoryImpl.getAuthMiddleware(AppUserRole.GUEST);

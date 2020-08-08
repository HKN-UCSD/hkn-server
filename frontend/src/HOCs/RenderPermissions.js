import RenderAuthorization from './RenderAuthorization';

/**
 * Use these functions like this:
 *
 * Given any <Component {...props} />, use these permission wrappers like this:
 *     OfficerRenderPermission(Component)({...props})
 *     MemberRenderPermission(Component)({...props})
 *     InducteeRenderPermission(Component)({...props})
 */
export const OfficerRenderPermission = RenderAuthorization([
  'admin',
  'officer',
]);

export const MemberRenderPermission = RenderAuthorization([
  'admin',
  'officer',
  'member',
]);

export const InducteeRenderPermission = RenderAuthorization([
  'admin',
  'officer',
  'member',
  'inductee',
]);

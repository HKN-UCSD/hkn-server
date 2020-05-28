import RenderByContextAuth from './RenderByContextAuth';

/**
 * Use these functions like this:
 *
 * Given any <Component {...props} />, use these permission wrappers like this:
 *     OfficerRenderPermission(Component)({...props})
 *     MemberRenderPermission(Component)({...props})
 *     InducteeRenderPermission(Component)({...props})
 */
export const OfficerRenderPermission = RenderByContextAuth([
  'admin',
  'officer',
]);

export const MemberRenderPermission = RenderByContextAuth([
  'admin',
  'officer',
  'member',
]);

export const InducteeRenderPermission = RenderByContextAuth([
  'admin',
  'officer',
  'member',
  'inductee',
]);

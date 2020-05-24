import RoutingByContextAuth from './RoutingByContextAuth';

/**
 * Use these functions like this:
 *
 * Given any <ComponentToRoute {...props}>, use these permission wrappers like this in App.js:
 *     <Route exact path={<path>} component={OfficerRoutingPermission(ComponentToRoute)} />
 *     <Route exact path={<path>} component={MemberRoutingPermission(ComponentToRoute)} />
 *     <Route exact path={<path>} component={InducteeRoutingPermission(ComponentToRoute)} />
 * Note that the component prop is to be like that, other props are up to the person using these
 * wrappers
 */
export const OfficerRoutingPermission = RoutingByContextAuth([
  'admin',
  'officer',
]);

export const MemberRoutingPermission = RoutingByContextAuth([
  'admin',
  'officer',
  'member',
]);

export const InducteeRoutingPermission = RoutingByContextAuth([
  'admin',
  'officer',
  'member',
  'inductee',
]);

import RoutingByContextAuth from './RoutingByContextAuth';

/**
 * Use these functions like this:
 *
 * OfficerRoutingPermission( NameOfTheComponentToRouteTo )( { a, b, c, ... } )
 * MemberRoutingPermission( NameOfTheComponentToRouteTo )( { a, b, c, ... } )
 * InducteeRoutingPermission( NameOfTheComponentToRouteTo )( { a, b, c, ... } )
 *
 * where { a, b, c, ... } are represented by Javascript as
 * { "a": a, "b": b, "c": c, ... } and { a, b, c, ... } are things you want
 * to pass down to NameOfTheComponentToRouteTo as props.
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

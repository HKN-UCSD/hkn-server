import RoleBasedRenderAuthorization from './RoleBasedRenderAuthorization';

/**
 * Use these functions like this:
 *
 * OfficerPermissionsForRender( NameOfTheComponentToRender )( { a, b, c, ... } )
 * MemberPermissionsForRender( NameOfTheComponentToRender )( { a, b, c, ... } )
 * InducteePermissionsForRender( NameOfTheComponentToRender )( { a, b, c, ... } )
 *
 * where { a, b, c, ... }are represented by Javascript as
 * { "a": a, "b": b, "c": c, ... } and { a, b, c, ... } are things you want
 * to pass down to NameOfTheComponentToRender as props.
 */
export const OfficerPermissionsForRender = RoleBasedRenderAuthorization([
  'admin',
  'officer',
]);
export const MemberPermissionsForRender = RoleBasedRenderAuthorization([
  'admin',
  'officer',
  'member',
]);
export const InducteePermissionsForRender = RoleBasedRenderAuthorization([
  'admin',
  'officer',
  'member',
  'inductee',
]);

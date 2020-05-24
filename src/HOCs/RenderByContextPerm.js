import RenderByContextAuth from './RenderByContextAuth';

/**
 * Use these functions like this:
 *
 * OfficerRenderPermission( NameOfTheComponentToRender )( { a, b, c, ... } )
 * MemberRenderPermission( NameOfTheComponentToRender )( { a, b, c, ... } )
 * InducteeRenderPermission( NameOfTheComponentToRender )( { a, b, c, ... } )
 *
 * where { a, b, c, ... } are represented by Javascript as
 * { "a": a, "b": b, "c": c, ... } and { a, b, c, ... } are things you want
 * to pass down to NameOfTheComponentToRender as props.
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

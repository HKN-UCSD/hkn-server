import Authorization from './Authorization';

export const OfficerPermissions = Authorization(['admin', 'officer']);
export const MemberPermissions = Authorization(['admin', 'officer', 'member']);
export const InducteePermissions = Authorization([
  'admin',
  'officer',
  'member',
  'inductee',
]);

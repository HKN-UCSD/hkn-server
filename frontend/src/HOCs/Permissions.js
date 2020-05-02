import Authorization from './Authorization';

export const OfficerPermissions = Authorization(['Admin', 'Officer']);
export const MemberPermissions = Authorization(['Admin', 'Officer', 'Member']);
export const InducteePermissions = Authorization([
  'Admin',
  'Officer',
  'Member',
  'Inductee',
]);

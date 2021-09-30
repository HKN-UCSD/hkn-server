import React from 'react';

import { Table } from '@SharedComponents';
import { AppUserResponse } from '@Services/api';

interface InductionClassAffiliateTableProps {
  affiliates: AppUserResponse[];
}

const InductionClassAffiliateTable = ({
  affiliates,
}: InductionClassAffiliateTableProps): JSX.Element => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Major', field: 'major' },
    { title: 'Graduation Year', field: 'graduationYear' },
    { title: 'Role', field: 'role' },
  ];

  const getAffiliateRow = (affiliate: AppUserResponse) => {
    const { firstName, lastName, role } = affiliate;
    const affiliateRow = {
      ...affiliate,
      name: `${firstName} ${lastName}`,
      role: role.charAt(0).toUpperCase() + role.slice(1),
    };

    return affiliateRow;
  };

  const affiliateData = affiliates.map(affiliate => getAffiliateRow(affiliate));

  return (
    <Table
      columns={columns}
      data={affiliateData}
      title=''
      options={{ exportButton: true }}
      pageSize={5}
    />
  );
};

export default InductionClassAffiliateTable;

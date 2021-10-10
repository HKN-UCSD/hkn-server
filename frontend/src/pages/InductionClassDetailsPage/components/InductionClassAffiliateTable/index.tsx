import React from 'react';

import { Table } from '@SharedComponents';
import { AppUserInductionClassResponse } from '@Services/api';

interface InductionClassAffiliateTableProps {
  affiliates: AppUserInductionClassResponse[];
}

const handleEmptyStringField = (fieldValue: string | undefined) => {
  if (fieldValue === undefined) {
    return '';
  }

  return fieldValue;
}

const InductionClassAffiliateTable = ({
  affiliates,
}: InductionClassAffiliateTableProps): JSX.Element => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Preferred Name', field: 'preferredName' },
    { title: 'Email', field: 'email' },
    { title: 'Major', field: 'major' },
    { title: 'Graduation Year', field: 'graduationYear' },
    { title: 'Info Session', field: 'infoSession' },
    { title: 'Pronoun', field: 'pronoun' },
  ];

  const getAffiliateRow = (affiliate: AppUserInductionClassResponse) => {
    const { firstName, lastName, preferredName, pronoun, customPronoun, infoSession } = affiliate;
    const affiliateRow = {
      ...affiliate,
      name: `${firstName} ${lastName}`,
      preferredName: handleEmptyStringField(preferredName),
      infoSession: handleEmptyStringField(infoSession),
      pronoun: (customPronoun !== undefined && customPronoun !== '') ? customPronoun : handleEmptyStringField(pronoun),
      customPronoun: handleEmptyStringField(pronoun),
    };

    return affiliateRow;
  };

  const affiliateData = affiliates.map(affiliate => getAffiliateRow(affiliate));

  return (
    <Table
      columns={columns}
      data={affiliateData}
      title=''
      pageSize={100}
    />
  );
};

export default InductionClassAffiliateTable;

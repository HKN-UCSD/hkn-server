import React from 'react';
import { useHistory } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

import { PROFILE_WITH_ID } from '@Constants/routes';
import { Table } from '@SharedComponents';
import { AppUserInductionClassResponse } from '@Services/api';

interface InductionClassAffiliateTableProps {
  affiliates: AppUserInductionClassResponse[];
}

interface InducteeRow {
  id: number;
  name: string;
  preferredName: string;
  email: string;
  major: string;
  graduationYear: string;
  infoSession: string;
  pronoun: string;
}

const handleEmptyStringField = (fieldValue: string | undefined) => {
  if (fieldValue === undefined) {
    return '';
  }

  return fieldValue;
};

const InductionClassAffiliateTable = ({
  affiliates,
}: InductionClassAffiliateTableProps): JSX.Element => {
  const history = useHistory();
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
    const {
      firstName,
      lastName,
      preferredName,
      pronoun,
      customPronoun,
      infoSession,
    } = affiliate;
    const affiliateRow = {
      ...affiliate,
      name: `${firstName} ${lastName}`,
      preferredName: handleEmptyStringField(preferredName),
      infoSession: handleEmptyStringField(infoSession),
      pronoun:
        customPronoun !== undefined && customPronoun !== ''
          ? customPronoun
          : handleEmptyStringField(pronoun),
      customPronoun: handleEmptyStringField(pronoun),
    };

    return affiliateRow;
  };

  const affiliateData = affiliates.map(affiliate => getAffiliateRow(affiliate));
  const actions = [
    {
      icon: () => <PersonIcon />,
      tooltip: 'User Profile',
      onClick: (_: unknown, row: InducteeRow) =>
        history.push(PROFILE_WITH_ID(row.id)),
    },
  ];

  return (
    <Table
      columns={columns}
      actions={actions}
      data={affiliateData}
      title=''
      pageSize={100}
    />
  );
};

export default InductionClassAffiliateTable;

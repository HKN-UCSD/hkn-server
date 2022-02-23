import React from 'react';
import { format, parseISO } from 'date-fns';

import InductionClassDetailsButton from '../buttons/InductionClassDetailsButton';

import { Loading, RequestErrorSnackbar, Table } from '@SharedComponents';
import { useRequest } from '@Hooks';
import { getMultipleInductionClasses } from '@Services/InductionClassService';
import {
  MultipleInductionClassResponse,
  InductionClassResponse,
  AppUserResponse,
  MultipleAppUserResponse,
} from '@Services/api';
import { inductionClassDateFormat } from '@Constants/dateTimeFormat';
import { getMultipleUsers } from '@Services/UserService';

// I copied this directly from the induction class table
const appUserResponseToAppUserRow = ({
  id,
  firstName,
  lastName,
  role,
  email,
}: AppUserResponse) => {
  const userRow = {
    id,
    name: firstName + ' ' + lastName,
    email,
    role,
  };

  return userRow;
};

function MemberTable(): JSX.Element {
  const { data, isLoading, error, isError } = useRequest<
    MultipleAppUserResponse,
    Response
  >({
    requestKey: 'getMultipleUsers',
    requestFunc: getMultipleUsers,
    requestParams: [{ showAffiliates: false }],
  });

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role' },
    {
      title: '',
      render: ({ id }: AppUserResponse) => (
        <InductionClassDetailsButton quarter={'0'} />
      ),
    },
  ];

  const ComponentToRender = () => {
    if (isError && error !== null) {
      return <RequestErrorSnackbar isError error={error} />;
    }

    if (isLoading || data === undefined) {
      return <Loading />;
    }

    const { users } = data;
    const userData = users.map(user => appUserResponseToAppUserRow(user));

    return (
      <Table
        columns={columns}
        data={userData}
        title=''
        options={{ exportButton: true }}
        pageSize={5}
      />
    );
  };

  return <ComponentToRender />;
}

export default MemberTable;

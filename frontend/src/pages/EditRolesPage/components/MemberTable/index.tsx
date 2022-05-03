import React from 'react';
import { format, parseISO } from 'date-fns';

import EditRolesButton from '../buttons/EditRolesButton';

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

const appUserResponseToAppUserRow = ({
  id,
  firstName,
  lastName,
  role,
  email,
}: AppUserResponse) => {
  const userRow = {
    id,
    firstName,
    lastName,
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
      render: ({ id, firstName, lastName, email, role }: AppUserResponse) => (
        <EditRolesButton
          id={id}
          email={email}
          firstName={firstName}
          lastName={lastName}
          role={role}
        />
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

import React from 'react';
import { Grid } from '@material-ui/core';

import MemberTable from './components/MemberTable';
import { Loading, RequestErrorSnackbar, Table } from '@SharedComponents';
import { useRequest } from '@Hooks';
import { getMultipleInductionClasses } from '@Services/InductionClassService';
import {
  MultipleInductionClassResponse,
  InductionClassResponse,
  AppUserResponse,
  MultipleAppUserResponse,
} from '@Services/api';
import { getMultipleUsers } from '@Services/UserService';

function EditRolesPage(): JSX.Element {
  const { data, isLoading, error, isError } = useRequest<
    MultipleAppUserResponse,
    Response
  >({
    requestKey: 'getMultipleUsers',
    requestFunc: getMultipleUsers,
    requestParams: [{ showAffiliates: false }],
  });
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <MemberTable
          data={data}
          isLoading={isLoading}
          error={error}
          isError={isError}
        />
      </Grid>
    </Grid>
  );
}

export default EditRolesPage;

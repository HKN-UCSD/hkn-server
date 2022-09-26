import React from 'react';
import { Grid } from '@material-ui/core';

import MemberTable from './components/MemberTable';

// Edit Roles Page
function EditRolesPage(): JSX.Element {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <MemberTable />
      </Grid>
    </Grid>
  );
}

export default EditRolesPage;

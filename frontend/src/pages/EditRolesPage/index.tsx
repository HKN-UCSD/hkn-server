import React from 'react';
import { Grid } from '@material-ui/core';

import InductionClassTable from './components/InductionClassTable';
import InductionClassCreateButton from './components/buttons/InductionClassCreateButton';

function EditRolesPage(): JSX.Element {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Grid container justifyContent='flex-start'>
          <Grid item>
            <InductionClassCreateButton />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <InductionClassTable />
      </Grid>
    </Grid>
  );
}

export default EditRolesPage;

import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './styles';

import { Card, FormLayout } from '@SharedComponents';
import {
  getAccountSection,
  getPersonalInfoSection,
} from '@SharedComponents/formSections';
import { PROFILE_EDIT_WITH_ID } from '@Constants/routes';
import { AppUserResponse, AppUserResponseRoleEnum } from '@Services/api/models';

function ProfilePage(): JSX.Element {
  const [profile, setProfile] = useState<AppUserResponse | null>(null);
  const classes = useStyles();

  setProfile({
    id: 1,
    firstName: 'Godwin',
    lastName: 'Pang',
    email: 'gypang@ucsd.edu',
    major: 'Computer Engineering',
    graduationYear: '2021',
    role: AppUserResponseRoleEnum.Officer,
  });

  if (profile === null) {
    return <></>;
  }

  const sections = [
    getAccountSection({ readOnly: true, ...profile }),
    getPersonalInfoSection({
      readOnly: true,
      ...profile,
    }),
  ];

  return (
    <Grid container className={classes.root}>
      <Card className={classes.paper}>
        <FormLayout
          readOnly
          editEndpoint={PROFILE_EDIT_WITH_ID(profile.id)}
          title='Profile'
          sections={sections}
        />
      </Card>
    </Grid>
  );
}

export default ProfilePage;

import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { RoleChip } from './RoleChip';

import { Card } from '@SharedComponents';
import { AppUserResponse } from '@Services/api/models';

export interface UserInfoCardProps {
  profile: AppUserResponse;
}

export function UserInfoCard({ profile }: UserInfoCardProps) {
  const { firstName, lastName, email, graduationYear, major, role } = profile;

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item md={5} sm={6} xs={12}>
          <Typography
            variant='h2'
            gutterBottom
          >{`${firstName} ${lastName}`}</Typography>
          <RoleChip role={role} />
        </Grid>
        <Grid item xs>
          <Typography variant='subtitle1' gutterBottom>
            {`Email: ${email}`}
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {`Major: ${major}`}
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {`Graduation Year: ${graduationYear}`}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

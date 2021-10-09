import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import { UserInfoCard, InducteeRequirementsCard } from './components';

import {
  AppUserResponse,
  AppUserResponseRoleEnum,
  AppUserInducteePointsResponse,
} from '@Services/api/models';

function ProfilePage(): JSX.Element {
  const [profile, setProfile] = useState<AppUserResponse | null>(null);
  const [
    inductionRequirements,
    setInductionRequirements,
  ] = useState<AppUserInducteePointsResponse | null>(null);
  const classes = useStyles();

  useEffect(() => {
    setProfile({
      id: 1,
      firstName: 'Godwin',
      lastName: 'Pang',
      email: 'gypang@ucsd.edu',
      major: 'Computer Engineering',
      graduationYear: '2021',
      role: AppUserResponseRoleEnum.Member,
    });
    setInductionRequirements({
      user: 1,
      points: 6,
      hasProfessionalRequirement: true,
      hasMentorshipRequirement: false,
      attendance: [
        {
          points: 1,
          attendee: 1,
          isInductee: true,
          startTime: '2020-11-13T01:00:00.000Z',
          event: {
            type: 'professional',
            startDate: '2020-11-13T01:00:00.000Z',
            name: 'Tech Talk',
          },
        },
        {
          points: 1.5,
          attendee: 1,
          isInductee: true,
          startTime: '2020-11-13T01:00:00.000Z',
          event: {
            type: 'social',
            startDate: '2020-11-13T01:00:00.000Z',
            name: 'Pizza',
          },
        },
      ],
    });
  }, []);

  if (profile === null) {
    return <></>;
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        {profile && <UserInfoCard profile={profile} />}
      </Grid>
      <Grid item xs={12}>
        {inductionRequirements && (
          <InducteeRequirementsCard
            inducteeRequirementStatus={inductionRequirements}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default ProfilePage;

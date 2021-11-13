import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

import { RoleChip } from '../RoleChip';

import { Card, Button } from '@SharedComponents';
import { AppUserResponse, AppUserInductionClass } from '@Services/api/models';
import * as ROUTES from '@Constants/routes';

export interface UserInfoCardProps {
  profile: AppUserResponse;
  canRenderEditButton: boolean;
}

const renderUserValue = (value: string | undefined, title: string) => {
  return value ? (
    <Typography variant='subtitle1' gutterBottom>
      <Typography variant='h6'>{`${title}:`}</Typography>
      <Typography>{`${value}`}</Typography>
    </Typography>
  ) : (
    <Typography variant='subtitle1' gutterBottom>
      <Typography variant='h6'>{`${title}:`}</Typography>
    </Typography>
  );
};

const renderInductionClassQuarter = (
  inductionClass: AppUserInductionClass | undefined,
  title: string
) => {
  return inductionClass ? (
    renderUserValue(`${inductionClass.name} (${inductionClass.quarter})`, title)
  ) : (
    <Typography variant='subtitle1' gutterBottom>
      <Typography variant='h6'>{`${title}:`}</Typography>
    </Typography>
  );
};

export function UserInfoCard({
  profile,
  canRenderEditButton,
}: UserInfoCardProps) {
  const history = useHistory();
  const {
    firstName,
    lastName,
    email,
    graduationYear,
    major,
    role,
    preferredName,
    pronoun,
    customPronoun,
    infoSession,
    inductionClass,
  } = profile;

  return (
    <Card>
      <Grid container direction='column'>
        <Grid item>
          <Grid container>
            <Grid item md={5} sm={6} xs={12}>
              <Typography variant='h2'>{`${firstName} ${lastName}`}</Typography>

              <RoleChip role={role} />
            </Grid>

            <Grid item xs>
              <Grid container justifyContent='flex-end' alignItems='flex-start'>
                {canRenderEditButton && (
                  <Button
                    primary
                    positive
                    onClick={() =>
                      history.push(
                        ROUTES.PROFILE_EDIT_WITH_ID(ROUTES.CURR_USER_ID_ALIAS)
                      )
                    }
                  >
                    Edit
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction='column'>
            <Grid item>
              <Grid container direction='row'>
                <Grid item xs>
                  {renderUserValue(preferredName, 'Preferred Name')}
                </Grid>

                <Grid item xs>
                  {renderUserValue(email, 'Email')}
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='row'>
                <Grid item xs>
                  {renderUserValue(major, 'Major')}
                </Grid>

                <Grid item xs>
                  {renderUserValue(graduationYear, 'Graduation Year')}
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='row'>
                <Grid item xs>
                  {renderUserValue(customPronoun || pronoun, 'Pronoun')}
                </Grid>

                <Grid item xs>
                  {renderUserValue(infoSession, 'Info Session Selected')}
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='row'>
                <Grid item xs>
                  {renderInductionClassQuarter(
                    inductionClass,
                    'Induction Class Quarter'
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

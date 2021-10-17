import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Grid, Typography } from '@material-ui/core';

import useStyles from './styles';
import { UserInfoCard, InducteeRequirementsCard } from './components';

import { UserContext } from '@Contexts';
import { DEFAULT_404_RESPONSE } from '@Constants/requestErrMsg';
import { CURR_USER_ID_ALIAS } from '@Constants/routes';
import { Card, RequestErrorSnackbar } from '@SharedComponents';
import {
  AppUserResponse,
  AppUserInducteePointsResponse,
} from '@Services/api/models';
import { isUnauthedOrNonOfficer } from '@Services/claims';
import { getUserById, getInductionPoints } from '@Services/UserService';

interface UserId {
  id: string;
}

function ProfilePage(): JSX.Element {
  const [profile, setProfile] = useState<AppUserResponse | undefined>(
    undefined
  );
  const [inductionRequirements, setInductionRequirements] = useState<
    AppUserInducteePointsResponse | undefined
  >(undefined);
  const [isUserMatchingId, setIsUserMatchingId] = useState<boolean>(true);
  const classes = useStyles();

  const userContext = useContext(UserContext);
  const { id } = useParams<UserId>();

  useEffect(() => {
    const getUserProfileAndInductionRequirements = async () => {
      if (userContext == null || isUnauthedOrNonOfficer(userContext, id)) {
        setProfile(undefined);
        return;
      }

      const { userId } = userContext;
      const currUserId: number =
        id === CURR_USER_ID_ALIAS ? parseInt(userId, 10) : parseInt(id, 10);

      try {
        const requestedProfile = await getUserById(currUserId);
        setProfile(requestedProfile);
        setIsUserMatchingId(id === CURR_USER_ID_ALIAS);
      } catch {
        setProfile(undefined);
      }

      try {
        const requestedInductionRequirements = await getInductionPoints(
          currUserId
        );
        setInductionRequirements(requestedInductionRequirements);
      } catch {
        setInductionRequirements(undefined);
      }
    };

    getUserProfileAndInductionRequirements();
  }, [id, userContext]);

  if (profile === undefined) {
    return <RequestErrorSnackbar isError error={DEFAULT_404_RESPONSE} />;
  }

  const NoInducteePointsComponent = () => (
    <Card>
      <Typography>You do not have any inductee points to display!</Typography>
    </Card>
  );

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        {profile && (
          <UserInfoCard
            profile={profile}
            canRenderEditButton={isUserMatchingId}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {inductionRequirements ? (
          <InducteeRequirementsCard
            inducteeRequirementStatus={inductionRequirements}
          />
        ) : (
          <NoInducteePointsComponent />
        )}
      </Grid>
    </Grid>
  );
}

export default ProfilePage;

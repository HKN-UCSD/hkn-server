import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@material-ui/core';

import { PointDisplay } from './components/PointDisplay';
import useStyles from './styles';

import { getInductionPoints } from '@Services/UserService';
import { AppUserInducteePointsResponse } from '@Services/api';
import { isOfficer } from '@Services/claims';
import { UserContext } from '@Contexts';
import { CURR_USER_ID_ALIAS } from '@Constants/routes';

interface EventID {
  id: string;
}

export default function PointsPage() {
  const { id } = useParams<EventID>();
  const userContext = useContext(UserContext);
  const [pointObj, setPointObj] = useState<
    AppUserInducteePointsResponse | undefined | string
  >(undefined);
  const classes = useStyles();

  useEffect(() => {
    const getPointsFunc = async () => {
      if (userContext == null) {
        return;
      }

      const { userId } = userContext;
      // If you're not an officer, you can only see yourself through
      // path param :id = me or :id = userId
      if (
        !isOfficer(userContext) &&
        id !== CURR_USER_ID_ALIAS &&
        id !== userId
      ) {
        setPointObj('404');
        return;
      }

      const currUserId: number =
        id === CURR_USER_ID_ALIAS ? parseInt(userId, 10) : parseInt(id, 10);
      const response: AppUserInducteePointsResponse = await getInductionPoints(
        currUserId
      );
      setPointObj(response);
    };
    getPointsFunc();
  }, [id, userContext]);

  if (pointObj === undefined) {
    return <h1>You have no points yet :(</h1>;
  }
  if (pointObj === '404') {
    return <h1>Permission denied.</h1>;
  }

  const {
    points,
    hasMentorshipRequirement,
    hasProfessionalRequirement,
    attendance,
  } = pointObj as AppUserInducteePointsResponse;

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <div style={{ margin: '20px' }}>
          <h2>Inductee Points</h2>
          <Grid container justify='space-between' spacing={3}>
            <Grid item>
              <h3>Total Inductee Points: {points}</h3>
            </Grid>
            <Grid item>
              <h3>
                Mentor Point:{' '}
                {hasMentorshipRequirement ? `Complete` : `Incomplete`}
              </h3>
            </Grid>
            <Grid item>
              <h3>
                Professional Requirement:{' '}
                {hasProfessionalRequirement ? `Complete` : `Incomplete`}
              </h3>
            </Grid>
          </Grid>
          <PointDisplay attendances={attendance} />
        </div>
      </div>
    </div>
  );
}

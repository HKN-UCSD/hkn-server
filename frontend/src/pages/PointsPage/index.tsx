import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import { Grid } from '@material-ui/core';

import { PointDisplay } from './components/PointDisplay';
import useStyles from './styles';

import { getInductionPoints } from '@Services/UserService';
import { AppUserInducteePointsResponse } from '@Services/api';
import { isOfficer } from '@Services/claims';
import { UserContext } from '@Contexts';
import { CURR_USER_ID_ALIAS, FORBIDDEN } from '@Constants/routes';

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
        setPointObj('403');
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
  if (pointObj === '403') {
    return <Redirect to={FORBIDDEN} />;
  }

  const Completion = ({ children }) => <span style={{ color: (children) ? 'green' : 'red' }}>{(children) ? 'Complete' : 'Incomplete'}</span>;

  const {
    points,
    hasMentorshipRequirement,
    hasProfessionalRequirement,
    hasTechnicalRequirement,
    hasSocialRequirement,
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
                <Completion>{hasMentorshipRequirement}</Completion>
              </h3>
            </Grid>
            <Grid item>
              <h3>
                Professional Requirement:{' '}
                <Completion>{hasProfessionalRequirement}</Completion>
              </h3>

            </Grid>
            <Grid item>
              <h3>
                Technical Requirement:{' '}
                <Completion>{hasTechnicalRequirement}</Completion>
              </h3>
            </Grid>
            <Grid item>
              <h3>
                Social Requirement:{' '}
                <Completion>{hasSocialRequirement}</Completion>
              </h3>
            </Grid>
          </Grid>
          <PointDisplay attendances={attendance} />
        </div>
      </div>
    </div>
  );
}

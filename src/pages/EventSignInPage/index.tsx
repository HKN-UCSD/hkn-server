import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Avatar, Typography, Grid } from '@material-ui/core';

import EventSignInForm from './components/EventSignInForm';
import useStyles from './styles';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Loading, Card, PublicPageLayout } from '@SharedComponents';
import { getEventById, signInToEvent } from '@Services/EventService';
import { EventResponse, AppUserEventRequest } from '@Services/api/models';

function EventSignInPage(): JSX.Element {
  const { id } = useParams();
  const [event, setEvent] = useState<EventResponse | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse: EventResponse = await getEventById(id);
      setEvent(eventResponse);
    };
    getEvent();
  }, [id]);

  return event == null ? (
    <Loading />
  ) : (
    <PublicPageLayout>
      <Card className={classes.eventSignInCard}>
        <Grid container direction='column' alignItems='center' spacing={3}>
          <Grid item>
            <Grid container direction='column' alignItems='center' spacing={3}>
              <Grid item>
                <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
              </Grid>

              <Grid item>
                <Typography
                  className={classes.eventName}
                  variant='h5'
                  align='center'
                >
                  {event.name}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6'>Event Sign In</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <EventSignInForm
              handleSubmit={(values: AppUserEventRequest) =>
                signInToEvent(id, values)
              }
            />
          </Grid>
        </Grid>
      </Card>
    </PublicPageLayout>
  );
}

export default EventSignInPage;

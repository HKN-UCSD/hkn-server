import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Avatar, Typography, Grid } from '@material-ui/core';

import EventRsvpForm from './components/EventRsvpForm';
import useStyles from './styles';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Loading, Card, PublicPageLayout } from '@SharedComponents';
import { getEventById, rsvpToEvent } from '@Services/EventService';
import { EventResponse, AppUserEventRequest } from '@Services/api/models';

interface ParamTypes {
  id: string;
}

function EventRsvpPage(): JSX.Element {
  const { id } = useParams<ParamTypes>();
  const eventID = parseInt(id, 10);
  const [event, setEvent] = useState<EventResponse | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(eventID);
      setEvent(eventResponse);
    };
    getEvent();
  }, [eventID]);

  return event == null ? (
    <Loading />
  ) : (
    <PublicPageLayout>
      <Card className={classes.eventRsvpCard}>
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
                <Typography variant='h6'>Event RSVP</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <EventRsvpForm
              handleSubmit={(appUserEventRequest: AppUserEventRequest) =>
                rsvpToEvent(eventID, appUserEventRequest)
              }
            />
          </Grid>
        </Grid>
      </Card>
    </PublicPageLayout>
  );
}

export default EventRsvpPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Avatar, Typography, Grid } from '@material-ui/core';

import EventSignInForm from './components/EventSignInForm';
import useStyles from './styles';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Loading, Card, PublicPageLayout } from '@SharedComponents';
import { getEventById, signInToEvent } from '@Services/EventService';
import { EventResponse, AppUserEventRequest } from '@Services/api/models';
import { format, parseISO } from 'date-fns';

interface ParamTypes {
  id: string;
}

function EventSignInPage(): JSX.Element {
  const { id } = useParams<ParamTypes>();
  const eventID = parseInt(id, 10);
  const [event, setEvent] = useState<EventResponse | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse: EventResponse = await getEventById(eventID);
      setEvent(eventResponse);
    };
    getEvent();
  }, [eventID]);

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
                <Grid component='div'>
                  <Typography
                    className={classes.eventName}
                    variant={event.name.length < 40 ? ('h3') : ('h4')}
                    align='center'
                  >
                    {event.name}
                  </Typography>

                  <Typography
                    className={classes.eventName}
                    variant='h5'
                    align='center'
                  >
                    {format(parseISO(event.startDate), 'PP')} -{' '}
                    {format(parseISO(event.startDate), 'p')} to{' '}
                    {format(parseISO(event.endDate), 'p')}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Typography className={classes.eventName}
                  variant='subtitle1'
                  align='center'>
                  Hosts: {event.hosts
                    .map(host => `${host.firstName} ${host.lastName}`)
                    .join(', ')}
                </Typography>
                <Typography className={classes.eventName}
                  variant='body2'
                  align='center'>
                  Event Details: {event.description}
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
                signInToEvent(eventID, values)
              }
            />
          </Grid>
        </Grid>
      </Card>
    </PublicPageLayout>
  );
}

export default EventSignInPage;

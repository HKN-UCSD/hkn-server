import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { format, parseISO } from 'date-fns';

import DeleteEditButtons from '../DeleteEditButtons';
import Links from '../Links/Links';
import SignInButton from '../SignInButton';
import RSVPButton from '../RSVPButton';

import useStyles from './styles';

import {
  OfficerRenderPermission,
  InducteeRenderPermission,
} from '@HOCs/RenderPermissions';
import { Tags, Card, GetLocation } from '@SharedComponents';
import { EventResponse as EventInfo } from '@Services/api/models';
import { EventStatusEnum } from '@Services/EventService';

interface EventDetailsComponentProps {
  eventInfo: EventInfo;
  eventId: number;
}

function EventDetailsComponent(props: EventDetailsComponentProps) {
  const { eventInfo, eventId } = props;
  const classes = useStyles();

  const {
    endDate,
    hosts,
    location = '',
    description,
    name,
    startDate,
    type = 'Event',
    fbURL = null,
    canvaURL = null,
    signInURL,
    rsvpURL,
    status,
  } = eventInfo;

  const urls = {
    fb: {
      url: fbURL,
      label: 'Facebook',
    },
    canva: { url: canvaURL, label: 'Canva' },
  };

  const renderSignInRSVPButtons = () =>
    status === EventStatusEnum.Ready ? (
      <Grid container justify='flex-end' spacing={1}>
        <Grid item>
          <SignInButton eventId={eventId} />
        </Grid>

        <Grid item>
          <RSVPButton eventId={eventId} />
        </Grid>
      </Grid>
    ) : (
      <></>
    );

  return (
    <Grid container justify='center' spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Grid container direction='row' spacing={3}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item sm={7} md={8}>
                  <Typography className={classes.title} variant='h4'>
                    {name}
                    <Tags tags={[type]} />
                  </Typography>
                </Grid>

                <Grid item sm={5} md={4}>
                  <Grid container direction='column' spacing={1}>
                    {/* add column */}
                    <Grid item>
                      {OfficerRenderPermission(DeleteEditButtons)({
                        eventId,
                      })}
                    </Grid>

                    <Grid item>{renderSignInRSVPButtons()}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction='row' spacing={3}>
                <Grid item xs={6}>
                  <Grid container direction='column' spacing={1}>
                    <Grid item>
                      <Typography className={classes.detail} variant='h6'>
                        Hosts:{' '}
                        <Typography>
                          {hosts
                            .map(host => `${host.firstName} ${host.lastName}`)
                            .join(', ')}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.detail} variant='h6'>
                        Location: <GetLocation location={location} />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.detail} variant='h6'>
                        Start Time:{' '}
                        <Typography>
                          {format(parseISO(startDate), 'PPP h:mm aaaa')}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.detail} variant='h6'>
                        End Time:{' '}
                        <Typography>
                          {format(parseISO(endDate), 'PPP h:mm aaaa')}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container direction='column' spacing={3}>
                    <Grid item>
                      <Typography className={classes.detail} variant='h6'>
                        Description: <Typography>{description}</Typography>
                      </Typography>
                    </Grid>

                    <Grid item>
                      {InducteeRenderPermission(Links)({
                        urls,
                        signIn: { url: signInURL, label: 'Sign In Form' },
                        rsvp: { url: rsvpURL, label: 'RSVP Form' },
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EventDetailsComponent;

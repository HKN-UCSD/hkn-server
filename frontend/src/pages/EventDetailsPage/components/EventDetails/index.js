import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import DeleteEditButtons from '../DeleteEditButtons';

import Links from './Links';
import styles from './styles';

import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
import { Tags, Card } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

function EventDetailsComponent(props) {
  const { classes, eventInfo, eventId } = props;
  const {
    endDate,
    hosts,
    location,
    description,
    name,
    startDate,
    type,
    fbURL,
    canvaURL,
    signInURL,
    rsvpURL,
  } = eventInfo;

  const urls = {
    fb: fbURL,
    canva: canvaURL,
    signin: signInURL,
    rsvp: rsvpURL,
  };

  const eventType = type || 'Event';

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <Card className={classes.eventDetailsCard}>
          <Grid container direction='column' justify='center' spacing={3}>
            <Grid item className={classes.firstRow}>
              <Grid container direction='row' justify='center'>
                <Grid item xs={6}>
                  <Typography className={classes.title} variant='h4'>
                    {name}
                    <Tags tags={[eventType]} />
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  {OfficerRenderPermission(DeleteEditButtons)({ eventId })}
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='row' justify='center'>
                <Grid item xs={6}>
                  <Typography className={classes.hosts} variant='h6'>
                    Hosts:{' '}
                    {hosts.map(host => (
                      <Typography key={host.id} className={classes.hostName}>
                        {`${host.firstName} ${host.lastName}`}
                      </Typography>
                    ))}
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography variant='h6'>
                        Location: <Typography>{location}</Typography>
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant='h6'>
                        Start Time:{' '}
                        <Typography>
                          {format(parseISO(startDate), 'PPP p')}
                        </Typography>
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant='h6'>
                        End Time:{' '}
                        <Typography>
                          {format(parseISO(endDate), 'PPP p')}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction='row' justify='center' spacing={3}>
                <Grid item xs={3}>
                  {OfficerRenderPermission(Links)({ urls })}
                </Grid>

                <Grid item xs={8}>
                  <Typography variant='h6'>
                    Description: <Typography>{description}</Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item>
        <Button
          className={classes.calendarButton}
          variant='outlined'
          color='secondary'
          to={ROUTES.CALENDAR}
          component={Link}
        >
          Back To Calendar
        </Button>
      </Grid>
    </Grid>
  );
}

EventDetailsComponent.propTypes = {
  eventInfo: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    hosts: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired })
    ).isRequired,
    location: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string.isRequired,
    fbURL: PropTypes.string,
    canvaURL: PropTypes.string,
    rsvpURL: PropTypes.string.isRequired,
    signInURL: PropTypes.string.isRequired,
  }),
  eventId: PropTypes.string.isRequired,
};

EventDetailsComponent.defaultProps = {
  eventInfo: {
    location: '',
    type: '',
    fbURL: '',
    canvaURL: '',
  },
};

export default withStyles(styles)(EventDetailsComponent);

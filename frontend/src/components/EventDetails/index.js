import React from 'react';
import { Typography, Container, Card, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import moment from 'moment';
import PropTypes from 'prop-types';

import Links from './Links';
import Tags from '../Tags';
import DeleteEditButtons from '../DeleteEditButtons';
import { OfficerPermissionsForRender } from '../../HOCs/RoleBasedRenderPermission';

import styles from './styles';
import * as ROUTES from '../../constants/routes';

function EventDetailsComponent(props) {
  const { classes, eventInfo, eventId } = props;
  const {
    endDate,
    hosts,
    location,
    name,
    startDate,
    tags,
    urls,
    description,
  } = eventInfo;

  return (
    <div className={classes.root}>
      <Card>
        <Container className={classes.container} maxWidth='sm'>
          <Grid container direction='row' xs={12}>
            <Grid className={classes.titleTag} xs={8}>
              <Typography variant='h4'>
                {name}
                <Tags tags={tags} />
              </Typography>
            </Grid>

            <Grid xs={4}>
              {OfficerPermissionsForRender(DeleteEditButtons)({ eventId })}
            </Grid>
          </Grid>

          <Grid
            className={classes.hostLocTime}
            container
            direction='row'
            xs={12}
          >
            <Grid xs={6}>
              <Typography className={classes.hosts} variant='h6'>
                Hosts:{' '}
                {hosts.map(host => (
                  <Typography className={classes.hostName}>{host}</Typography>
                ))}
              </Typography>
            </Grid>

            <Grid container direction='column' xs={6}>
              <Typography variant='h6'>
                Location: <Typography>{location}</Typography>
              </Typography>

              <Typography variant='h6'>
                Start Time:{' '}
                <Typography>
                  {moment(startDate.toDate()).format('LLL')}
                </Typography>
              </Typography>

              <Typography variant='h6'>
                End Time:{' '}
                <Typography>
                  {moment(endDate.toDate()).format('LLL')}
                </Typography>
              </Typography>
            </Grid>
          </Grid>

          <Grid className={classes.descURL} container direction='row' xs={12}>
            <Grid xs={3}>
              <Links urls={urls} />
            </Grid>

            <Grid xs={9}>
              <Typography className={classes.desc} variant='h6'>
                Description: <Typography>{description}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Card>

      <Button
        className={classes.calendarButton}
        variant='outlined'
        color='secondary'
        to={ROUTES.CALENDAR}
        component={Link}
      >
        Back To Calendar
      </Button>
    </div>
  );
}

EventDetailsComponent.propTypes = {
  eventInfo: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    hosts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      fb: PropTypes.string.isRequired,
      canva: PropTypes.string.isRequired,
      rsvp: PropTypes.string.isRequired,
      signin: PropTypes.string.isRequired,
    }),
  }).isRequired,
  eventId: PropTypes.string.isRequired,
};

export default withStyles(styles)(EventDetailsComponent);

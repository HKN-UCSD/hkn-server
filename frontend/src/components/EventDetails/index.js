import React from 'react';
import
{
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles';
import * as ROUTES from '../../constants/routes';

function EventDetailsComponent(props)
{
  let { classes, eventInfo } = props;
  let { endDate, hosts, location, name, startDate, tags, urls } = eventInfo;
  let { fb, canva, rsvp, signin } = urls;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title={name} />
        <CardContent>
          <Typography>
            <Typography>Location: {location}</Typography>
            <Typography>Start date: {moment(startDate).format('LLL')}</Typography>
            <Typography>End date: {moment(endDate).format('LLL')}</Typography>
            <Typography>Tags: {tags}</Typography>
            <Typography>Hosts: {hosts}</Typography>
            <Typography>
              URLs:
              <Typography>fb: {fb}</Typography>
              <Typography>canva: {canva}</Typography>
              <Typography>rsvp: {rsvp}</Typography>
              <Typography>signin: {signin}</Typography>
            </Typography>
          </Typography>
        </CardContent>
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
  eventInfo: PropTypes.object
};

export default withStyles(styles)(EventDetailsComponent);
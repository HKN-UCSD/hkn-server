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

function EventDetails(props)
{
  let { classes } = props;
  let { eventInfo } = props.location.state;
  let { title, venue, startDate, endDate, description } = eventInfo;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title={title} />
        <CardContent>
          <Typography>
            <Typography>Location: {venue}</Typography>
            <Typography>Start date: {moment(startDate).format('LLL')}</Typography>
            <Typography>End date: {moment(endDate).format('LLL')}</Typography>
            <Typography>Description: {description}</Typography>
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

EventDetails.propTypes = {
  eventInfo: PropTypes.object
};

export default withStyles(styles)(EventDetails);
import React from 'react';
import
{
  Typography,
  Container,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Links from './Links';
import Tags from '../Tags';
import DeleteEditButtons from './DeleteEditButtons';

import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles';
import * as ROUTES from '../../constants/routes';

function EventDetailsComponent(props)
{
  let { classes, eventInfo } = props;
  let { endDate, hosts, location, name, startDate, tags, urls, description } = eventInfo;

  /*<Typography>
            <Typography>Location: {location}</Typography>
            <Typography>Start date: {moment(startDate).format('LLL')}</Typography>
            <Typography>End date: {moment(endDate).format('LLL')}</Typography>
            <Typography>Tag: <Tags tags={tags} /></Typography>
            <Typography>Description: {description}</Typography>
            <Typography>Hosts: {hosts}</Typography>
            <Links urls={urls} />
          </Typography>
          */

  return (
    <div className={classes.root}>
      <Container
        className={classes.container}
        maxWidth='sm'
      >
        <div className={classes.topRow}>
          <Typography
            className={classes.titleTag}
            variant='h4'
          >
            {name}
            <Tags tags={tags} />
          </Typography>

          <DeleteEditButtons />
        </div>

        <div className={classes.hostLocTime}>
          <Typography variant='h6'>
            Hosts: {hosts.map(host => <Typography className={classes.hostName}>{host}</Typography>)}
          </Typography>

          <div className={classes.locTime}>
            <Typography variant='h6'>
              Location: <Typography>{location}</Typography>
            </Typography>
          </div>
        </div>
      </Container>

      <Button
        className={classes.calendarButton}
        variant='outlined'
        color='secondary'
        to={ROUTES.CALENDAR}
        component={Link}
      >
        Back To Calendar
      </Button>
    </div >
  );
}

EventDetailsComponent.propTypes = {
  eventInfo: PropTypes.object
};

export default withStyles(styles)(EventDetailsComponent);
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import * as ROUTES from '../../constants/routes';
import { deleteEventById } from '../../services/events';

function DeleteEditButtons(props) {
  const { classes, eventId } = props;

  return (
    <div className={classes.root}>
      <Button
        className={classes.delete}
        variant='contained'
        color='secondary'
        to={ROUTES.CALENDAR}
        component={Link}
        onClick={() => {
          deleteEventById(eventId)
            .then(res => {
              return res;
            })
            .catch(err => {
              throw Error(err);
            });
        }}
      >
        <DeleteIcon /> Delete
      </Button>

      <Button
        className={classes.edit}
        variant='contained'
        color='primary'
        to={`/events/${eventId}/edit`}
        component={Link}
      >
        <EditIcon /> Edit
      </Button>
    </div>
  );
}

DeleteEditButtons.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteEditButtons);

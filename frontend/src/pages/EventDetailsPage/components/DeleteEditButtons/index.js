import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Button, ButtonWithConfirmationModal } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { deleteEventById } from '@Services/events';
import styles from './styles';

const DeleteEditButtons = props => {
  const { classes, eventId } = props;

  const handleDeleteEvent = eventToDeleteId => {
    deleteEventById(eventToDeleteId)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteEvent(eventId);
  };

  const confirmButtonProps = {
    name: 'Yes',
    onClick: handleConfirmDelete,
    to: ROUTES.CALENDAR,
    component: Link,
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    positive: true,
  };

  return (
    <div className={classes.root}>
      <ButtonWithConfirmationModal
        title='Delete this event?'
        contentText='Do you want to delete this event permanently?'
        confirmButtonProps={confirmButtonProps}
        cancelButtonProps={cancelButtonProps}
        name='Delete'
        className={classes.delete}
        startIcon={<DeleteIcon />}
        primary
        negative
      />

      <Button
        className={classes.edit}
        variant='contained'
        color='primary'
        to={`/events/${eventId}/edit`}
        component={Link}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
    </div>
  );
};

DeleteEditButtons.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteEditButtons);

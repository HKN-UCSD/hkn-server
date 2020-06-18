import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './styles';

import * as ROUTES from '../../constants/routes';
import { deleteEventById } from '../../services/events';

const INITIAL_STATES = {
  isConfirmationModalOpen: false,
};

class DeleteEditButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATES };
  }

  handleModalOpen = () => {
    this.setState({ isConfirmationModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isConfirmationModalOpen: false });
  };

  handleDeleteEvent = eventId => {
    deleteEventById(eventId)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });

    this.handleModalClose();
  };

  render() {
    const { classes, eventId } = this.props;
    const { isConfirmationModalOpen } = this.state;

    return (
      <div className={classes.root}>
        <Button
          className={classes.delete}
          variant='contained'
          color='secondary'
          onClick={this.handleModalOpen}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Dialog open={isConfirmationModalOpen} onClose={this.handleModalClose}>
          <DialogTitle>Delete this event?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete this event completely?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color='primary'
              to={ROUTES.CALENDAR}
              component={Link}
              onClick={() => this.handleDeleteEvent(eventId)}
            >
              Yes
            </Button>
            <Button onClick={this.handleModalClose} color='primary'>
              No
            </Button>
          </DialogActions>
        </Dialog>

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
  }
}

DeleteEditButtons.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteEditButtons);

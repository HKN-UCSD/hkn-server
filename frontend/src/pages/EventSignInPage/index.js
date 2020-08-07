import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card } from '@material-ui/core';

import EventSignInForm from './components/EventSignInForm';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';

class EventSignInPage extends React.Component {
  constructor(props) {
    const {
      match: {
        params: { id },
      },
    } = props;

    super(props);

    this.state = {
      eventId: id,
    };
  }

  handleSubmit = (values, setSubmitting) => {
    const { history } = this.props;
    const { eventId } = this.state;

    setSubmitting(false);
    history.push(`/events/${eventId}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
        <EventSignInForm handleSubmit={this.handleSubmit} />
      </Card>
    );
  }
}

EventSignInPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default EventSignInPage;

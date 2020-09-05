import React from 'react';
import PropTypes from 'prop-types';

import EventDetailsComponent from './components/EventDetails';

import { Loading } from '@SharedComponents';
import { getEventById } from '@Services/EventService';

class EventDetailsPage extends React.Component {
  constructor(props) {
    const {
      match: {
        params: { id },
      },
    } = props;

    super(props);

    this.state = {
      eventId: id,
      eventInfo: null,
    };
  }

  componentDidMount() {
    const { eventId } = this.state;

    getEventById(eventId)
      .then(eventObj => {
        this.setState({ eventInfo: eventObj });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { eventId, eventInfo } = this.state;

    const EventDetails =
      eventInfo == null ? (
        <Loading />
      ) : (
        <EventDetailsComponent eventId={eventId} eventInfo={eventInfo} />
      );

    return EventDetails;
  }
}

EventDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default EventDetailsPage;

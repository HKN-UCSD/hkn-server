import React from 'react';

import Loading from '../../components/Loading';

import EventDetailsComponent from '../../components/EventDetails';
import { getEventById } from '../../services/events';

class EventDetailsPage extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      eventInfo: null,
    }
  }

  componentDidMount()
  {
    let eventId = this.state.eventId;

    getEventById(eventId)
      .then(eventObj =>
      {
        this.setState({ eventInfo: eventObj });
      })
      .catch(err =>
      {
        console.log(err);
      });
  }

  render()
  {
    const EventDetails = (this.state.eventInfo === null) ? <Loading /> : <EventDetailsComponent eventInfo={this.state.eventInfo} />

    return (
      EventDetails
    );
  }
}

export default EventDetailsPage;
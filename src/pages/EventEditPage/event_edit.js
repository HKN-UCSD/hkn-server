import React from 'react';
import PropTypes from 'prop-types';

import EventEditForm from './components/EventEditForm';

import { getEventById, setEventDetails } from '@Services/events';

class EventEditPage extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { eventId },
      },
    } = props;
    this.state = { eventId, initialValues: {}, formLoading: true };
  }

  componentDidMount() {
    const { eventId } = this.state;

    getEventDetails(eventId).then(event => {
      const initialValues = {
        ...event,
        startDate: event.startDate,
        endDate: event.endDate,
      };
      this.setState({ initialValues, formLoading: false });
    });
  }

  render() {
    const { history } = this.props;

    const { eventId, initialValues, formLoading } = this.state;

    const handleCancel = () => {
      // history.push(`/event/${eventId}`); // Waiting for event detail page
      history.goBack(); // TODO Remove!
    };

    const handleSubmit = (values, setSubmitting) => {
      const parsedStartDate = new Date(values.startDate);
      const parsedEndDate = new Date(values.endDate);

      const submission = {
        ...values,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      };
      setEventDetails(eventId, submission).then(() => {
        setSubmitting(false);
        // history.push(`/event/${eventId}`); // Waiting for event detail page
        history.goBack(); // TODO Remove!
      });
    };

    return (
      <div>
        {formLoading ? (
          <div />
        ) : (
          <EventEditForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            eventId={eventId}
            initialValues={initialValues}
          />
        )}
      </div>
    );
  }
}

EventEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EventEditPage;

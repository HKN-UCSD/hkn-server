import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getEventDetails, setEventDetails } from '../../services/events';
import EventEditForm from '../../components/EventEditForm';

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
        startDate: moment(event.startDate).toDate(),
        endDate: moment(event.endDate).toDate(),
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
      const submission = {
        ...values,
        startDate: values.startDate.toString(),
        endDate: values.endDate.toString(),
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

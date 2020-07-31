import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getEventById, setEventDetails } from '@Services/events';
import EventEditForm from './components/EventEditForm';

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

    getEventById(eventId).then(event => {
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
      history.push(`/events/${eventId}`);
    };

    const handleSubmit = (values, setSubmitting) => {
      const submission = {
        ...values,
        startDate: moment(values.startDate).toDate(),
        endDate: moment(values.endDate).toDate(),
      };
      setEventDetails(eventId, submission).then(() => {
        setSubmitting(false);
        history.push(`/events/${eventId}`);
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

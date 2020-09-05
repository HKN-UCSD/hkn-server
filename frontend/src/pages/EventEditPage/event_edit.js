import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';

import EventEditForm from './components/EventEditForm';

import { getEventById, updateEvent } from '@Services/EventService';

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

    getEventById(eventId).then(eventInfo => {
      this.setState({
        initialValues: {
          ...eventInfo,
          hosts: eventInfo.hosts.map(host => {
            return {
              id: host.id,
              firstName: host.firstName,
              lastName: host.lastName,
            };
          }),
        },
        formLoading: false,
      });
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
        hosts: values.hosts.map(host => {
          return {
            id: host.id,
          };
        }),
      };

      updateEvent(eventId, submission).then(() => {
        setSubmitting(false);
        history.push(`/events/${eventId}`);
      });
    };

    return (
      <div>
        {formLoading ? (
          <div />
        ) : (
          <Card>
            <EventEditForm
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              eventId={eventId}
              initialValues={initialValues}
            />
          </Card>
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

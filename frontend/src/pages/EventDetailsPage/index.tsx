import React from 'react';
import { useParams } from 'react-router';
import { Grid } from '@material-ui/core';

import BackToCalendarButton from './components/buttons/BackToCalendarButton';
import EventDetailsComponent from './components/EventDetails';
import AttendanceRSVPCard from './components/AttendanceRSVPCard';

import { Loading, RequestErrorSnackbar } from '@SharedComponents';
import { getEventById } from '@Services/EventService';
import { EventResponse } from '@Services/api/models';
import { useRequest } from '@Hooks';

interface EventID {
  id: string;
}

function EventDetailsPage(): JSX.Element {
  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);
  const { data, error, isError, isLoading } = useRequest<
    EventResponse,
    Response
  >({
    requestKey: `getEvent_id${eventId}`,
    requestFunc: getEventById,
    requestParams: [eventId],
  });

  const ReturnedComponent = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (isError && error !== null) {
      return <RequestErrorSnackbar isError error={error} />;
    }
    if (data === undefined) {
      return <Loading />;
    }

    return (
      <Grid container justify='center' spacing={3}>
        <Grid item xs={12}>
          <EventDetailsComponent eventId={eventId} eventInfo={data} />
        </Grid>

        <Grid item xs={12}>
          <AttendanceRSVPCard eventID={eventId} />
        </Grid>

        <Grid item>
          <BackToCalendarButton />
        </Grid>
      </Grid>
    );
  };

  return <ReturnedComponent />;
}

export default EventDetailsPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@material-ui/core';

import BackToCalendarButton from './components/BackToCalendarButton';
import EventDetailsComponent from './components/EventDetails';
import CheckOffTable from './components/CheckOffTable';

import { Loading } from '@SharedComponents';
import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
import {
  getEventById,
  getEventAttendances,
  checkOffAttendance,
} from '@Services/EventService';
import { EventResponse } from '@Services/api/models';

interface EventID {
  id: string;
}

function EventDetailsPage(): JSX.Element {
  const { id } = useParams<EventID>();
  const eventId = parseInt(id, 10);
  const [eventInfo, setEventInfo] = useState<EventResponse | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(eventId);
      setEventInfo(eventResponse);
    };

    getEvent();
  }, [eventId]);

  return eventInfo == null ? (
    <Loading />
  ) : (
    <Grid container justify='center' spacing={3}>
      <Grid item xs={12}>
        <EventDetailsComponent eventId={eventId} eventInfo={eventInfo} />
      </Grid>

      <Grid item xs={12}>
        {OfficerRenderPermission(CheckOffTable)({
          getAttendances: () => getEventAttendances(eventId, true, false),
          checkOffAttendance,
          eventId,
        })}
      </Grid>

      <Grid item>
        <BackToCalendarButton />
      </Grid>
    </Grid>
  );
}

export default EventDetailsPage;

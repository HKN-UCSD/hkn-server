import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import EventDetailsComponent from './components/EventDetails';

import { Loading } from '@SharedComponents';
import { getEventById } from '@Services/EventService';
import { EventResponse } from '@Services/api/models';

function EventDetailsPage(): JSX.Element {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState<EventResponse | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(id);
      setEventInfo(eventResponse);
    };

    getEvent();
  }, [id]);

  return eventInfo == null ? (
    <Loading />
  ) : (
    <EventDetailsComponent eventId={id} eventInfo={eventInfo} />
  );
}

export default EventDetailsPage;

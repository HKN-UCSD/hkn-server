import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import EventDetailsComponent from './components/EventDetails';

import { Loading } from '@SharedComponents';
import { getEventById } from '@Services/EventService';
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
    <EventDetailsComponent eventId={eventId} eventInfo={eventInfo} />
  );
}

export default EventDetailsPage;

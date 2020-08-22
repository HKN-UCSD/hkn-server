import { EventRequest, EventResponse } from '@Payloads';
import { Event } from '@Entities';

import { classToPlain, plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';

export class EventMapper {
  requestToNewEntity(eventRequest: EventRequest): Event {
    const eventRepository = getRepository(Event);
    const plainEventRequest: object = classToPlain(eventRequest);

    return eventRepository.create(plainEventRequest);
  }

  /**
   * Returns event if there exists event with given id. otherwise returns undefined.
   *
   * @param eventRequest eventRequest to convert
   * @param eventID id of event to load
   * @returns {Event} event with given id and fields filled in from eventRequest
   */
  async requestToExistingEntity(
    eventRequest: EventRequest,
    eventID: number
  ): Promise<Event | undefined> {
    const eventObj: Event = eventRequest as Event;
    eventObj.id = eventID; // preload expects an id.

    const eventRepository = getRepository(Event);
    const event: Event = await eventRepository.preload(eventObj);

    if (event === undefined) {
      return undefined;
    }

    // preload ignores empty arrays and loads arrays anyways.
    if (eventObj.hosts.length == 0) {
      event.hosts = [];
    }

    return event;
  }

  entityToResponse(event: Event): EventResponse {
    const plainEvent: Object = classToPlain(event);
    const eventResponse: EventResponse = plainToClass(EventResponse, plainEvent);
    eventResponse.rsvpURL = event.rsvpURL;
    eventResponse.signInURL = event.signInURL;
    return eventResponse;
  }
}

export const EventMapperImpl = new EventMapper();

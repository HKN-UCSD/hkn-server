import { EventRequest, EventResponse } from '@Payloads';
import { AppUserService, AppUserServiceImpl } from '@Services';
import { Event } from '@Entities';

import { classToPlain, plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';

export class EventMapper {
  constructor(private appUserService: AppUserService) {}

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
    const { hosts } = eventObj;
    eventObj.id = eventID; // preload expects an id.

    const eventRepository = getRepository(Event);
    const event: Event = await eventRepository.preload(eventObj);

    if (event === undefined) {
      return undefined;
    }

    // preload ignores empty arrays and loads arrays anyways.
    if (eventObj.hosts.length == 0) {
      event.hosts = [];
    } else {
      event.hosts = await Promise.all(
        hosts.map(host => this.appUserService.getAppUserById(host.id))
      );
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

export const EventMapperImpl = new EventMapper(AppUserServiceImpl);

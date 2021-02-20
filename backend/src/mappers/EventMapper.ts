import { EventRequest, EventResponse } from '@Payloads';
import { AppUserService, AppUserServiceImpl } from '@Services';
import { Event, AppUser } from '@Entities';

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
    const event = await eventRepository.preload(eventObj);

    if (event === undefined) {
      return undefined;
    }

    // Typecasting to pass array of ids to hosts, of which TypeORM should have supported.
    // This has to be done because preload merges for many-to-many relations instead of replaces.
    event.hosts = hosts as AppUser[];

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

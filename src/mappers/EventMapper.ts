import { EventRequest, EventResponse } from '@Payloads';
import { Event } from '@Entities';
import { EventRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { singleton, inject } from 'tsyringe';

@singleton()
export class EventMapper {
  private eventRepository: Repository<Event>;

  constructor(@inject(EventRepositoryToken) eventRepository: Repository<Event>) {
    this.eventRepository = eventRepository;
  }

  requestToNewEntity(eventRequest: EventRequest): Event {
    const plainEventRequest: object = classToPlain(eventRequest);
    return this.eventRepository.create(plainEventRequest);
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

    const event: Event = await this.eventRepository.preload(eventObj);
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

import { JsonController, Param, Get, Post, Delete, Body } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Event } from '@Entities';
import { EventRequest, EventResponse, MultipleEventResponse } from '@Payloads';
import { EventService } from '@Services';
import { EventMapper } from '@Mappers';

@singleton()
@JsonController('/api/events')
export class EventController {
  private eventService: EventService;
  private eventMapper: EventMapper;

  constructor(
    @inject(EventService) eventService: EventService,
    @inject(EventMapper) eventMapper: EventMapper
  ) {
    this.eventService = eventService;
    this.eventMapper = eventMapper;
  }

  @Post('/')
  @ResponseSchema(EventResponse)
  async createEvent(@Body() eventRequest: EventRequest): Promise<EventResponse> {
    const event = this.eventMapper.requestToNewEntity(eventRequest);
    const savedEvent = await this.eventService.saveEvent(event);
    return this.eventMapper.entityToResponse(savedEvent);
  }

  @Get('/')
  @ResponseSchema(MultipleEventResponse)
  async getMultipleEvents(): Promise<MultipleEventResponse> {
    const events: Event[] = await this.eventService.getAllEvents();
    const eventResponses = events.map(event => this.eventMapper.entityToResponse(event));

    const multipleEventResponse = new MultipleEventResponse();
    multipleEventResponse.events = eventResponses;
    return multipleEventResponse;
  }

  @Get('/:eventID')
  @ResponseSchema(EventResponse)
  async getEvent(@Param('eventID') eventID: number): Promise<EventResponse> {
    const event = await this.eventService.getEventById(eventID);
    if (event === undefined) {
      return undefined;
    }
    return this.eventMapper.entityToResponse(event);
  }

  @Post('/:eventID')
  @ResponseSchema(EventResponse)
  async updateEvent(
    @Param('eventID') id: number,
    @Body() eventRequest: EventRequest
  ): Promise<EventResponse> {
    const event = await this.eventMapper.requestToExistingEntity(eventRequest, id);
    if (event === undefined) {
      return undefined;
    }

    const savedEvent = await this.eventService.saveEvent(event);
    return this.eventMapper.entityToResponse(savedEvent);
  }

  @Delete('/:eventID')
  @ResponseSchema(EventResponse)
  async deleteEvent(@Param('eventID') eventID: number): Promise<EventResponse> {
    const deletedEvent = await this.eventService.deleteEvent(eventID);
    if (deletedEvent === undefined) {
      return undefined;
    }

    return this.eventMapper.entityToResponse(deletedEvent);
  }
}

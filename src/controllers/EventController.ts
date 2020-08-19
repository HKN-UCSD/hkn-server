import {
  JsonController,
  Param,
  Get,
  Post,
  Delete,
  Body,
  OnUndefined,
  UseBefore,
} from 'routing-controllers';
import { singleton, inject } from 'tsyringe';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Event, AppUserRole } from '@Entities';
import {
  AttendanceResponse,
  EventRequest,
  EventResponse,
  MultipleEventResponse,
  AppUserEventRequest,
  RSVPResponse,
} from '@Payloads';
import { AppUserService, EventService } from '@Services';
import { AppUserMapper, EventMapper, AttendanceMapper, RSVPMapper } from '@Mappers';
import { OfficerAuthorizationFactory } from '@Middlewares';

@singleton()
@JsonController('/api/events')
export class EventController {
  private appUserService: AppUserService;
  private appUserMapper: AppUserMapper;
  private eventService: EventService;
  private eventMapper: EventMapper;
  private attendanceMapper: AttendanceMapper;
  private rsvpMapper: RSVPMapper;

  constructor(
    @inject(AppUserService) appUserService: AppUserService,
    @inject(AppUserMapper) appUserMapper: AppUserMapper,
    @inject(EventService) eventService: EventService,
    @inject(EventMapper) eventMapper: EventMapper,
    @inject(AttendanceMapper) attendanceMapper: AttendanceMapper,
    @inject(RSVPMapper) rsvpMapper: RSVPMapper
  ) {
    this.appUserService = appUserService;
    this.appUserMapper = appUserMapper;
    this.eventService = eventService;
    this.eventMapper = eventMapper;
    this.attendanceMapper = attendanceMapper;
    this.rsvpMapper = rsvpMapper;
  }

  @Post('/')
  @ResponseSchema(EventResponse)
  async createEvent(@Body() eventRequest: EventRequest): Promise<EventResponse> {
    const event = this.eventMapper.requestToNewEntity(eventRequest);
    const savedEvent = await this.eventService.saveEvent(event);
    return this.eventMapper.entityToResponse(savedEvent);
  }

  @Get('/')
  @UseBefore(OfficerAuthorizationFactory())
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

  @Post('/:eventID/signin')
  @OnUndefined(409)
  @ResponseSchema(AttendanceResponse)
  async signInToEvent(
    @Param('eventID') eventID: number,
    @Body() appUserRequest: AppUserEventRequest
  ): Promise<AttendanceResponse | undefined> {
    const appUserToSave = await this.appUserMapper.requestToEntityByEmail(appUserRequest);
    const savedAppUser = await this.appUserService.saveNonAffiliate(appUserToSave);

    if (savedAppUser === undefined) {
      /*
       * TODO: Handle the case where user is an affiliate
       * If affiliated user has a token, then verify it and proceed. If said
       * user does not have a token, then send back an HTTP error.
       */
    }

    const newAttendance = await this.eventService.registerEventAttendance(eventID, savedAppUser);

    return this.attendanceMapper.entityToResponse(newAttendance);
  }

  @Post('/:eventID/rsvp')
  @OnUndefined(409)
  @ResponseSchema(RSVPResponse)
  async rsvpForEvent(
    @Param('eventID') eventID: number,
    @Body() appUserRequest: AppUserEventRequest
  ): Promise<RSVPResponse | undefined> {
    const appUserToSave = await this.appUserMapper.requestToEntityByEmail(appUserRequest);
    const savedAppUser = await this.appUserService.saveNonAffiliate(appUserToSave);

    if (savedAppUser === undefined) {
      /*
       * TODO: Handle the case where user is an affiliate
       * If affiliated user has a token, then verify it and proceed. If said
       * user does not have a token, then send back an HTTP error.
       */
    }

    const newRSVP = await this.eventService.registerEventRSVP(eventID, savedAppUser);

    return this.rsvpMapper.entityToResponse(newRSVP);
  }
}

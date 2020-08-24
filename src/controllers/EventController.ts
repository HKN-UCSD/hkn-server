import {
  JsonController,
  Param,
  Get,
  Post,
  Delete,
  Body,
  OnUndefined,
  UseBefore,
  CurrentUser,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Event, AppUser } from '@Entities';
import {
  AttendanceResponse,
  EventRequest,
  EventResponse,
  MultipleEventResponse,
  AppUserEventRequest,
  RSVPResponse,
} from '@Payloads';
import { AppUserService, AppUserServiceImpl, EventService, EventServiceImpl } from '@Services';
import {
  AppUserMapper,
  AppUserMapperImpl,
  EventMapper,
  EventMapperImpl,
  AttendanceMapper,
  AttendanceMapperImpl,
  RSVPMapper,
  RSVPMapperImpl,
} from '@Mappers';
import { OfficerAuthMiddleware } from '@Middlewares';

@JsonController('/api/events')
export class EventController {
  constructor(
    private appUserService: AppUserService,
    private appUserMapper: AppUserMapper,
    private eventService: EventService,
    private eventMapper: EventMapper,
    private attendanceMapper: AttendanceMapper,
    private rsvpMapper: RSVPMapper
  ) {}

  @Post('/')
  @UseBefore(OfficerAuthMiddleware)
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
  @UseBefore(OfficerAuthMiddleware)
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
  @UseBefore(OfficerAuthMiddleware)
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
    @Body() appUserRequest: AppUserEventRequest,
    @CurrentUser() appUser: AppUser
  ): Promise<AttendanceResponse | undefined> {
    let currAppUser = appUser;

    if (appUser === undefined) {
      const appUserToSave = await this.appUserMapper.requestToEntityByEmail(appUserRequest);
      currAppUser = await this.appUserService.saveNonAffiliate(appUserToSave);
    }

    const newAttendance = await this.eventService.registerEventAttendance(eventID, currAppUser);

    return this.attendanceMapper.entityToResponse(newAttendance);
  }

  @Post('/:eventID/rsvp')
  @OnUndefined(409)
  @ResponseSchema(RSVPResponse)
  async rsvpForEvent(
    @Param('eventID') eventID: number,
    @Body() appUserRequest: AppUserEventRequest,
    @CurrentUser() appUser: AppUser
  ): Promise<RSVPResponse | undefined> {
    let currAppUser = appUser;

    if (appUser === undefined) {
      const appUserToSave = await this.appUserMapper.requestToEntityByEmail(appUserRequest);
      currAppUser = await this.appUserService.saveNonAffiliate(appUserToSave);
    }

    const newRSVP = await this.eventService.registerEventRSVP(eventID, currAppUser);

    return this.rsvpMapper.entityToResponse(newRSVP);
  }
}

export const EventControllerImpl = new EventController(
  AppUserServiceImpl,
  AppUserMapperImpl,
  EventServiceImpl,
  EventMapperImpl,
  AttendanceMapperImpl,
  RSVPMapperImpl
);

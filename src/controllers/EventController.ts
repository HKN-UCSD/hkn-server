import {
  JsonController,
  Param,
  Get,
  Post,
  Delete,
  Body,
  UseBefore,
  CurrentUser,
  QueryParams,
} from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { Event, AppUser } from '@Entities';
import {
  AttendanceCheckOffRequest,
  AttendanceResponse,
  MultipleAttendanceResponse,
  MultipleAttendanceQuery,
  EventRequest,
  EventResponse,
  MultipleEventResponse,
  AppUserEventRequest,
  RSVPResponse,
} from '@Payloads';
import {
  AttendanceService,
  AttendanceServiceImpl,
  AppUserService,
  AppUserServiceImpl,
  EventService,
  EventServiceImpl,
} from '@Services';
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
    private attendanceService: AttendanceService,
    private attendanceMapper: AttendanceMapper,
    private rsvpMapper: RSVPMapper
  ) {}

  @Post('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(EventResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
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
  @OpenAPI({ security: [{ TokenAuth: [] }] })
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
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async deleteEvent(@Param('eventID') eventID: number): Promise<EventResponse> {
    const deletedEvent = await this.eventService.deleteEvent(eventID);
    if (deletedEvent === undefined) {
      return undefined;
    }

    return this.eventMapper.entityToResponse(deletedEvent);
  }

  @Get('/:eventID/attendance')
  @ResponseSchema(MultipleAttendanceResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getEventAttendance(
    @Param('eventID') eventID: number,
    @QueryParams() multipleAttendanceQuery: MultipleAttendanceQuery
  ): Promise<MultipleAttendanceResponse | undefined> {
    const attendances = await this.eventService.getEventAttendances(
      eventID,
      multipleAttendanceQuery
    );

    return { attendances };
  }

  @Post('/:eventID/attendance')
  @ResponseSchema(AttendanceResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async checkOffEventAttendance(
    @Param('eventID') eventID: number,
    @Body() attendanceCheckOffRequest: AttendanceCheckOffRequest
  ): Promise<AttendanceResponse | undefined> {
    const { attendeeId, officerId, ...otherValues } = attendanceCheckOffRequest;

    return this.attendanceService.saveAttendance({
      ...otherValues,
      attendee: { id: attendeeId } as AppUser,
      officer: { id: officerId } as AppUser,
      event: { id: eventID } as Event,
    });
  }

  @Post('/:eventID/signin')
  @ResponseSchema(AttendanceResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
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
  @ResponseSchema(RSVPResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
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
  AttendanceServiceImpl,
  AttendanceMapperImpl,
  RSVPMapperImpl
);

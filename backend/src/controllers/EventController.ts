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
  ForbiddenError,
  UnauthorizedError,
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
  MultipleEventQuery,
  AppUserEventRequest,
  RSVPResponse,
  MultipleRSVPResponse,
  AttendanceResultResponse,
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
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getMultipleEvents(
    @QueryParams() multipleEventQuery: MultipleEventQuery,
    @CurrentUser() appUser: AppUser
  ): Promise<MultipleEventResponse | undefined> {
    let isOfficer = true;

    // Check if user is an officer to see if we should show pending events to them
    // if there are any and if they are requesting for pending events
    if (appUser === undefined || !this.appUserService.isOfficer(appUser)) {
      isOfficer = false;
    }

    const events: Event[] = await this.eventService.getAllEvents(multipleEventQuery, isOfficer);
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

    if (attendances === undefined) {
      return undefined;
    }

    const mappedAttendances = attendances.map(attendance =>
      this.attendanceMapper.entityToResponse(attendance)
    );

    return { attendances: mappedAttendances };
  }

  @Get('/:eventID/rsvp')
  @ResponseSchema(MultipleRSVPResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getEventRSVP(@Param('eventID') eventID: number): Promise<MultipleRSVPResponse | undefined> {
    const rsvps = await this.eventService.getEventRSVPs(eventID);

    if (rsvps === undefined) {
      return undefined;
    }

    const mappedRSVPs = rsvps.map(rsvp => this.rsvpMapper.entityToResponse(rsvp));

    return { rsvps: mappedRSVPs };
  }

  @Post('/:eventID/attendance')
  @ResponseSchema(AttendanceResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async checkOffEventAttendance(
    @Param('eventID') eventID: number,
    @Body() attendanceCheckOffRequest: AttendanceCheckOffRequest,
    @CurrentUser() officer: AppUser
  ): Promise<AttendanceResponse | undefined> {
    const { attendeeId } = attendanceCheckOffRequest;
    const checkedOffAttendance = await this.attendanceService.checkOffAttendance(
      eventID,
      attendeeId,
      officer.id
    );

    return this.attendanceMapper.entityToResponse(checkedOffAttendance);
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
    } else {
      // Affiliates have to use the signin endpoint for affiliates
      throw new ForbiddenError();
    }

    const newAttendance = await this.eventService.registerEventAttendance(eventID, currAppUser);

    return this.attendanceMapper.entityToResponse(newAttendance);
  }

  @Post('/:eventID/signin/affiliate')
  @ResponseSchema(AttendanceResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async affiliateEventSignin(
    @Param('eventID') eventID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AttendanceResponse | undefined> {
    if (appUser === undefined) {
      throw new UnauthorizedError();
    }

    const newAttendance = await this.eventService.registerEventAttendance(eventID, appUser);

    return this.attendanceMapper.entityToResponse(newAttendance);
  }

  @Get('/:eventID/signin/affiliate/result')
  @ResponseSchema(AttendanceResultResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async affiliateEventSigninResult(
    @Param('eventID') eventID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<AttendanceResultResponse | undefined> {
    if (appUser === undefined) {
      throw new UnauthorizedError();
    }

    const newAttendance = await this.attendanceService.getAttendance(appUser.id, eventID);

    if (newAttendance === undefined) {
      return { attendeeId: appUser.id, eventId: eventID, signin: false };
    }
    return { attendeeId: appUser.id, eventId: eventID, signin: true };
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
    } else {
      // Affiliates have to use the rsvp endpoint for affiliates
      throw new ForbiddenError();
    }

    const newRSVP = await this.eventService.registerEventRSVP(eventID, currAppUser);

    return this.rsvpMapper.entityToResponse(newRSVP);
  }

  @Post('/:eventID/rsvp/affiliate')
  @ResponseSchema(RSVPResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async affiliateEventRSVP(
    @Param('eventID') eventID: number,
    @CurrentUser({ required: true }) appUser: AppUser
  ): Promise<RSVPResponse | undefined> {
    if (appUser === undefined) {
      throw new UnauthorizedError();
    }

    const newRSVP = await this.eventService.registerEventRSVP(eventID, appUser);

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

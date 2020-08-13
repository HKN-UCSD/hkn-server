import { JsonController, Param, Get, Post, Delete, Body } from 'routing-controllers';
import { singleton, inject } from 'tsyringe';
import { ResponseSchema } from 'routing-controllers-openapi';

import { Event, AppUser, AppUserRole, Attendance } from '@Entities';
import {
  EventRequest,
  EventResponse,
  MultipleEventResponse,
  EventSignInRequest,
  EventSignInResponse,
} from '@Payloads';
import { AppUserService, EventService, AttendanceService } from '@Services';
import { AppUserMapper, EventMapper } from '@Mappers';

@singleton()
@JsonController('/api/events')
export class EventController {
  private appUserService: AppUserService;
  private appUserMapper: AppUserMapper;
  private eventService: EventService;
  private eventMapper: EventMapper;

  constructor(
    @inject(AppUserService) appUserService: AppUserService,
    @inject(AppUserMapper) appUserMapper: AppUserMapper,
    @inject(EventService) eventService: EventService,
    @inject(EventMapper) eventMapper: EventMapper
  ) {
    this.appUserService = appUserService;
    this.appUserMapper = appUserMapper;
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

  @Post('/:eventID/signin')
  @ResponseSchema(Attendance)
  async signInToEvent(
    @Param('eventID') eventID: number,
    @Body() appUserRequest: EventSignInRequest
  ): Promise<Attendance> {
    const { email } = appUserRequest;
    const appUserFromEmail = await this.appUserService.getAppUserByEmail(email);

    if (appUserFromEmail == undefined) {
      const newAppUser = this.appUserMapper.requestToNewEntity(appUserRequest);
      const savedAppUser = await this.appUserService.saveAppUser(newAppUser);
      await this.eventService.registerAttendance(eventID, savedAppUser);

      return null;
    } else {
      const { id, role } = appUserFromEmail;

      if (role !== AppUserRole.GUEST) {
        // return HTTP error
      } else {
        const updatedAppUser = await this.appUserMapper.requestToExistingEntity(appUserRequest, id);
        const savedUpdatedUser = await this.appUserService.saveAppUser(updatedAppUser);
        await this.eventService.registerAttendance(eventID, savedUpdatedUser);

        return null;
      }
    }
  }
}

import {
  JsonController,
  Get,
  Post,
  UseBefore,
  QueryParams,
  CurrentUser,
  Body,
} from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AppUser } from '@Entities';
import {
  AttendanceCheckOffRequest,
  AttendanceResponse,
  MultipleAttendanceResponse,
  MultipleAttendanceQuery,
  EventIDRequest,
} from '@Payloads';
import {
  AttendanceService,
  AttendanceServiceImpl,
  EventService,
  EventServiceImpl,
} from '@Services';
import { AttendanceMapper, AttendanceMapperImpl } from '@Mappers';
import { OfficerAuthMiddleware } from '@Middlewares';

@JsonController('/api/attendances')
export class AttendanceController {
  constructor(
    private eventService: EventService,
    private attendanceService: AttendanceService,
    private attendanceMapper: AttendanceMapper
  ) {}

  @Get('/')
  @ResponseSchema(MultipleAttendanceResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getEventAttendance(
    @Body() eventIDRequest: EventIDRequest,
    @QueryParams() multipleAttendanceQuery: MultipleAttendanceQuery
  ): Promise<MultipleAttendanceResponse | undefined> {
    const { eventID } = eventIDRequest;
    const attendances = await this.eventService.getEventAttendances(
      eventID,
      multipleAttendanceQuery
    );

    const mappedAttendances = attendances.map(attendance =>
      this.attendanceMapper.entityToResponse(attendance)
    );

    return { attendances: mappedAttendances };
  }

  @Post('/')
  @ResponseSchema(AttendanceResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async checkOffEventAttendance(
    @Body() attendanceCheckOffRequest: AttendanceCheckOffRequest,
    @CurrentUser() officer: AppUser
  ): Promise<AttendanceResponse | undefined> {
    const { attendeeID, eventID } = attendanceCheckOffRequest;
    const checkedOffAttendance = await this.attendanceService.checkOffAttendance(
      eventID,
      attendeeID,
      officer.id
    );

    return this.attendanceMapper.entityToResponse(checkedOffAttendance);
  }
}

export const AttendanceControllerImpl = new AttendanceController(
  EventServiceImpl,
  AttendanceServiceImpl,
  AttendanceMapperImpl
);

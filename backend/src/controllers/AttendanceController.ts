import {
  JsonController,
  Post,
  Delete,
  UseBefore,
  Param,
  Body,
  QueryParams,
  CurrentUser,
} from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AttendanceService, AttendanceServiceImpl } from '@Services';
import { OfficerAuthMiddleware } from '@Middlewares';
import { AttendanceRequest, AttendanceResponse, GetAttendanceQuery } from '@Payloads';
import { AttendanceMapper, AttendanceMapperImpl } from '@Mappers';
import { AppUser } from '@Entities';

@JsonController('/api/attendances')
export class AttendanceController {
  constructor(
    private attendanceService: AttendanceService,
    private attendanceMapper: AttendanceMapper
  ) {}

  @Post('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(AttendanceResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async updateAttendanceTimes(
    @QueryParams() getAttendanceQuery: GetAttendanceQuery,
    @Body() attendanceRequest: AttendanceRequest,
    @CurrentUser() officer: AppUser
  ): Promise<AttendanceResponse> {
    // Use attendee and event id to get attendance
    // Modify attendance's start and end times
    // Save to DB
    // Return modified attendance
    return undefined;
  }

  @Delete('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(AttendanceResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async deleteAttendance(
    @QueryParams() getAttendanceQuery: GetAttendanceQuery
  ): Promise<AttendanceResponse> {
    const { attendeeId, eventId } = getAttendanceQuery;
    const deletedAttendance = await this.attendanceService.deleteAttendance(attendeeId, eventId);

    if (deletedAttendance === undefined) {
      return undefined;
    }

    return this.attendanceMapper.entityToResponse(deletedAttendance);
  }
}

export const AttendanceControllerImpl = new AttendanceController(
  AttendanceServiceImpl,
  AttendanceMapperImpl
);

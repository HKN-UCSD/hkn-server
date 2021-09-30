import {
  JsonController,
  Post,
  Delete,
  UseBefore,
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
    const { id } = officer;
    const savedAttendance = await this.attendanceService.saveAttendance(
      getAttendanceQuery,
      attendanceRequest,
      id
    );

    return this.attendanceMapper.entityToResponse(savedAttendance);
  }

  @Delete('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(AttendanceResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async deleteAttendance(
    @QueryParams() getAttendanceQuery: GetAttendanceQuery
  ): Promise<AttendanceResponse | undefined> {
    const deletedAttendance = await this.attendanceService.deleteAttendance(getAttendanceQuery);

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

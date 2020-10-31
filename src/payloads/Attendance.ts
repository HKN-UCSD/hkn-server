import {
  IsOptional,
  IsDate,
  IsBoolean,
  IsNumber,
  IsInstance,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AppUserEventResponse } from './AppUser';
import { EventAttendanceResponse } from './Event';

export class AttendanceCheckOffRequest {
  @IsInt()
  readonly attendeeId: number;
}

export class AttendanceResponse {
  @IsInstance(AppUserEventResponse)
  attendee: AppUserEventResponse;

  @IsInstance(EventAttendanceResponse)
  event: EventAttendanceResponse;

  @IsBoolean()
  isInductee: Boolean;

  @IsInstance(AppUserEventResponse)
  @IsOptional()
  officer: AppUserEventResponse;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsNumber()
  @IsOptional()
  points?: number;
}

export class MultipleAttendanceResponse {
  @ValidateNested({ each: true })
  @Type(() => AttendanceResponse)
  attendances: AttendanceResponse[];
}

export class MultipleAttendanceQuery {
  // If unchecked is true, then query only for attendances that are not checked off by officers
  @IsBoolean()
  @IsOptional()
  unchecked: boolean;

  @IsBoolean()
  @IsOptional()
  inductee: boolean;
}

import { IsOptional, IsBoolean, IsNumber, IsInstance } from 'class-validator';
import { AppUserEventResponse } from './AppUser';
import { EventAttendanceResponse } from './Event';

abstract class BaseAttendancePayload {
  @IsInstance(AppUserEventResponse)
  readonly attendee: AppUserEventResponse;

  @IsInstance(EventAttendanceResponse)
  readonly event: EventAttendanceResponse;

  @IsBoolean()
  readonly isInductee: Boolean;
}

export class AttendanceResponse extends BaseAttendancePayload {
  @IsInstance(AppUserEventResponse)
  @IsOptional()
  readonly officer: AppUserEventResponse;

  @IsNumber()
  @IsOptional()
  readonly duration: number;
}

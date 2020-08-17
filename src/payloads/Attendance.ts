import { IsOptional, IsBoolean, IsNumber, IsInstance } from 'class-validator';
import { AppUserEventResponse } from './AppUser';
import { EventAttendanceResponse } from './Event';

export class AttendanceResponse {
  @IsInstance(AppUserEventResponse)
  readonly attendee: AppUserEventResponse;

  @IsInstance(EventAttendanceResponse)
  readonly event: EventAttendanceResponse;

  @IsBoolean()
  readonly isInductee: Boolean;

  @IsInstance(AppUserEventResponse)
  @IsOptional()
  readonly officer: AppUserEventResponse;

  @IsNumber()
  @IsOptional()
  readonly duration: number;
}

import { IsOptional, IsBoolean, IsNumber, IsInstance } from 'class-validator';
import { AppUserEventRequest } from './AppUser';
import {} from './Event';

abstract class BaseAttendancePayload {
  @IsInstance(AppUserEventRequest)
  readonly attendee: AppUserEventRequest;

  @IsBoolean()
  readonly isInductee: Boolean;
}

export class AttendanceResponse extends BaseAttendancePayload {
  @IsInstance(AppUserEventRequest)
  @IsOptional()
  readonly officer: AppUserEventRequest;

  @IsNumber()
  @IsOptional()
  readonly duration: number;
}

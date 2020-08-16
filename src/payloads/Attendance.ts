import { ValidateNested, IsOptional, IsBoolean, IsNumber, IsInstance } from 'class-validator';
import { AppUser, Event } from '@Entities';

abstract class BaseAttendancePayload {
  @ValidateNested({ each: true })
  @IsInstance(AppUser)
  readonly attendee: AppUser;

  @ValidateNested({ each: true })
  @IsInstance(Event)
  readonly event: Event;

  @IsBoolean()
  readonly isInductee: Boolean;
}

export class AttendanceResponse extends BaseAttendancePayload {
  @ValidateNested({ each: true })
  @IsInstance(AppUser)
  @IsOptional()
  readonly officer: AppUser;

  @IsNumber()
  @IsOptional()
  readonly duration: number;
}

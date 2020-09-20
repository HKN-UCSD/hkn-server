import {
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  IsArray,
  IsInt,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AppUser, EventType, EventStatus } from '@Entities';
import { AppUserPKPayload } from './AppUser';

export class EventRequest {
  @ValidateNested({ each: true })
  @Type(() => AppUserPKPayload)
  readonly hosts: AppUserPKPayload[];

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly location: string;

  @IsDateString()
  readonly startDate: string;

  @IsDateString()
  readonly endDate: string;

  @IsString()
  @IsEnum(EventType)
  @IsOptional()
  readonly type: string;

  @IsUrl()
  @IsOptional()
  readonly fbURL: string;

  @IsUrl()
  @IsOptional()
  readonly canvaURL: string;
}

export class EventResponse {
  @IsInt()
  id: number;

  @IsArray() // TODO call @ValidateNested after defining AppUserResponse
  hosts: AppUser[];

  @IsUrl()
  rsvpURL: string;

  @IsUrl()
  signInURL: string;

  @IsString()
  @IsEnum(EventStatus)
  status: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsEnum(EventType)
  @IsOptional()
  type: string;

  @IsUrl()
  @IsOptional()
  fbURL: string;

  @IsUrl()
  @IsOptional()
  canvaURL: string;
}

export class MultipleEventResponse {
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events: EventResponse[];
}

export class EventAttendanceResponse {
  @IsArray()
  hosts: AppUser[];

  @IsString()
  @IsEnum(EventStatus)
  status: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsEnum(EventType)
  @IsOptional()
  type: string;

  @IsUrl()
  @IsOptional()
  fbURL: string;

  @IsUrl()
  @IsOptional()
  canvaURL: string;
}

export class EventRSVPResponse {
  @IsArray()
  hosts: AppUser[];

  @IsString()
  @IsEnum(EventStatus)
  status: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsEnum(EventType)
  @IsOptional()
  type: string;

  @IsUrl()
  @IsOptional()
  fbURL: string;

  @IsUrl()
  @IsOptional()
  canvaURL: string;
}

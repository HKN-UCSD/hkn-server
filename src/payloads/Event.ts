import {
  IsEmail,
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  IsArray,
  IsInt,
  ValidateNested,
  IsEnum,
  IsNumber,
  IsInstance,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AppUser, AppUserRole, EventType, EventStatus } from '@Entities';
import { AppUserPKPayload, AppUserEventRequest } from './AppUser';

abstract class BaseEventPayload {
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

export class EventRequest extends BaseEventPayload {
  @ValidateNested({ each: true })
  @Type(() => AppUserPKPayload)
  readonly hosts: AppUserPKPayload[];
}

export class EventResponse extends BaseEventPayload {
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
}

export class MultipleEventResponse {
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events: EventResponse[];
}

export class EventSignInRequest extends AppUserEventRequest {}

export class EventSignInResponse extends AppUserEventRequest {
  @IsInt()
  id: number;

  @IsEnum(AppUserRole)
  role: string;
}

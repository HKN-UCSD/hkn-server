import {
  IsString,
  IsOptional,
  IsDateString,
  IsUrl,
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';

import { AppUser } from '@Entities';
import { Type } from 'class-transformer';

abstract class BaseEventPayload {
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
  @IsOptional()
  type: string;

  @IsUrl()
  @IsOptional()
  rsvpURL: string;

  @IsUrl()
  @IsOptional()
  signInURL: string;

  @IsUrl()
  @IsOptional()
  fbURL: string;

  @IsUrl()
  @IsOptional()
  canvaURL: string;
}

export class EventRequest extends BaseEventPayload {
  @IsInt({ each: true })
  hosts: number[];
}

export class EventResponse extends BaseEventPayload {
  @IsInt()
  id: number;

  @IsArray() // TODO call @ValidateNested after defining AppUserResponse
  hosts: AppUser[];
}

export class MultipleEventResponse {
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  events: EventResponse[];
}

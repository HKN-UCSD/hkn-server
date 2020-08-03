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
  @IsOptional()
  readonly type: string;

  @IsUrl()
  @IsOptional()
  readonly rsvpURL: string;

  @IsUrl()
  @IsOptional()
  readonly signInURL: string;

  @IsUrl()
  @IsOptional()
  readonly fbURL: string;

  @IsUrl()
  @IsOptional()
  readonly canvaURL: string;
}

export class EventRequest extends BaseEventPayload {
  @IsInt({ each: true })
  readonly hosts: number[];
}

export class EventResponse extends BaseEventPayload {
  @IsInt()
  readonly id: number;

  @IsArray() // TODO call @ValidateNested after defining AppUserResponse
  readonly hosts: AppUser[];
}

export class MultipleEventResponse {
  @ValidateNested({ each: true })
  @Type(() => EventResponse)
  readonly events: EventResponse[];
}

import {
  IsDateString,
  IsEnum,
  IsInt,
} from 'class-validator';

import { EventType } from '@Entities';

export class EventStatisticsRequest {
  @IsDateString()
  readonly startDate: string;

  @IsDateString()
  readonly endDate: string;
}

export class EventStatisticsPayload {
  @IsEnum(EventType)
  eventType: string;

  @IsInt()
  totalAttendees: number;

  @IsInt()
  guests: number;

  @IsInt()
  inductees: number;

  @IsInt()
  members: number;

  @IsInt()
  officers: number;
}
import { IsInstance, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { AppUserEventResponse } from './AppUser';
import { EventRSVPResponse } from './Event';

export class RSVPResponse {
  @IsInstance(EventRSVPResponse)
  event: EventRSVPResponse;

  @IsInstance(AppUserEventResponse)
  appUser: AppUserEventResponse;
}

export class MultipleRSVPResponse {
  @ValidateNested({ each: true })
  @Type(() => RSVPResponse)
  rsvps: RSVPResponse[];
}

export class GetRSVPQuery {
  @IsNumber()
  eventId: number;

  @IsNumber()
  appUserId: number;
}

export class AffiliateGetRSVPResponse {
  @IsNumber()
  eventId: number;

  @IsNumber()
  appUserId: number;

  @IsBoolean()
  isRsvped: boolean;
}

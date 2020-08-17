import { IsInstance } from 'class-validator';
import { AppUserEventResponse } from './AppUser';
import { EventRSVPResponse } from './Event';

export class RSVPResponse {
  @IsInstance(EventRSVPResponse)
  event: EventRSVPResponse;

  @IsInstance(AppUserEventResponse)
  appUser: AppUserEventResponse;
}

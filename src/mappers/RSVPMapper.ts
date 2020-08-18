import { RSVPResponse } from '@Payloads';
import { RSVP } from '@Entities';

import { classToPlain, plainToClass } from 'class-transformer';
import { singleton } from 'tsyringe';

@singleton()
export class RSVPMapper {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  constructor() {}

  /**
   * Converts an RSVP entity to an RSVPResponse payload and returns the
   * newly created response payload to the caller.
   *
   * @param {RSVP} rsvp The RSVP entity to be converted to an RSVPResponse.
   * @returns {RSVPResponse} An RSVPResponse instance.
   */
  entityToResponse(rsvp: RSVP): RSVPResponse {
    const plainRSVP: Object = classToPlain(rsvp);
    const rsvpResponse: RSVPResponse = plainToClass(RSVPResponse, plainRSVP);

    return rsvpResponse;
  }
}

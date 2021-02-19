import { RSVPResponse } from '@Payloads';
import { RSVP } from '@Entities';

import { classToPlain, plainToClass } from 'class-transformer';

export class RSVPMapper {
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

export const RSVPMapperImpl = new RSVPMapper();

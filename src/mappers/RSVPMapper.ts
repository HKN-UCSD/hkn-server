import { RSVPResponse } from '@Payloads';
import { RSVP } from '@Entities';
import { RSVPService } from '@Services';
import { RSVPRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { singleton, inject } from 'tsyringe';

@singleton()
export class RSVPMapper {
  private rsvpRepository: Repository<RSVP>;
  private rsvpService: RSVPService;

  constructor(
    @inject(RSVPRepositoryToken) rsvpRepository: Repository<RSVP>,
    @inject(RSVPService) rsvpService: RSVPService
  ) {
    this.rsvpRepository = rsvpRepository;
    this.rsvpService = rsvpService;
  }

  entityToResponse(rsvp: RSVP): RSVPResponse {
    const plainRSVP: Object = classToPlain(rsvp);
    const rsvpResponse: RSVPResponse = plainToClass(RSVPResponse, plainRSVP);

    return rsvpResponse;
  }
}

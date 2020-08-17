import { AppUser, Event, RSVP } from '@Entities';
import { RSVPRepositoryToken } from '@Repositories';

import { Repository } from 'typeorm';
import { singleton, inject } from 'tsyringe';

@singleton()
export class RSVPService {
  private rsvpRepository: Repository<RSVP>;

  constructor(@inject(RSVPRepositoryToken) rsvpRepository: Repository<RSVP>) {
    this.rsvpRepository = rsvpRepository;
  }

  async registerRSVP(event: Event, appUser: AppUser): Promise<RSVP | undefined> {
    const RSVP = { event, appUser };
    const newRSVP = this.rsvpRepository.create(RSVP);

    try {
      await this.rsvpRepository.insert(newRSVP);
    } catch {
      return undefined;
    }

    return newRSVP;
  }
}

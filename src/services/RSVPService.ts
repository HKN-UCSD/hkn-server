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

  /**
   * Creates a new RSVP entity, then attempts to insert it into the DB.
   *
   * @param {Event} event The Event entity whose RSVP list can be potentially modified.
   * @param {AppUser} appUser The AppUser entity registering for RSVP of the specified event.
   * @returns {Promise} A new RSVP entity, but undefined for duplicate RSVP.
   */
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

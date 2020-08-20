import { AppUser, Event, RSVP } from '@Entities';
import { getRepository } from 'typeorm';

export class RSVPService {
  /**
   * Creates a new RSVP entity, then attempts to insert it into the DB.
   *
   * @param {Event} event The Event entity whose RSVP list can be potentially modified.
   * @param {AppUser} appUser The AppUser entity registering for RSVP of the specified event.
   * @returns {Promise} A new RSVP entity, but undefined for duplicate RSVP.
   */
  async registerRSVP(event: Event, appUser: AppUser): Promise<RSVP | undefined> {
    const rsvpRepository = getRepository(RSVP);
    const rsvpBeingProcessed = { event, appUser };
    const newRSVP = rsvpRepository.create(rsvpBeingProcessed);

    try {
      await rsvpRepository.insert(newRSVP);
    } catch {
      return undefined;
    }

    return newRSVP;
  }
}

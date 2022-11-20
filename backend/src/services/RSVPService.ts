import { AppUser, Event, RSVP } from '@Entities';
import { GetRSVPQuery } from '@Payloads';
import { getRepository, FindManyOptions } from 'typeorm';

export class RSVPService {
  private buildMultipleRSVPQuery(event: Event, cacheOn: boolean): FindManyOptions<RSVP> {
    const query: FindManyOptions<RSVP> = {};

    query.where = { event: event };
    query.relations = ['appUser', 'event'];

    if (cacheOn) {
      query.cache = true;
    }

    return query;
  }

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

  async getEventRSVPs(event: Event): Promise<RSVP[]> {
    const rsvpRepository = getRepository(RSVP);
    const query = this.buildMultipleRSVPQuery(event, true);

    return rsvpRepository.find(query);
  }

  /**
   * Finds the rsvp that matches the inputted user and event ID.
   *
   * @param {number} eventId ID in the DB of the event.
   * @param {number} userId ID in the DB of the appuser.
   * @returns {Promise} The RSVP entity matching user and event ID. Returns undefined if there
   * is no such entity in the DB.
   */
  async getUserRSVP(eventId: number, userId: number): Promise<RSVP | undefined> {
    const rsvpRepository = getRepository(RSVP);
    return rsvpRepository.findOne(
      {
        event: { id: eventId } as Event,
        appUser: { id: userId } as AppUser,
      },

      { relations: ['event', 'appUser'] }
    );
  }

  async deleteAffiliateRSVP(rsvpQuery: GetRSVPQuery): Promise<RSVP | undefined> {
    const rsvpRepository = getRepository(RSVP);
    const { eventId, appUserId } = rsvpQuery;

    const rsvp = await this.getUserRSVP(eventId, appUserId);
    return rsvp ? rsvpRepository.remove(rsvp) : undefined;
  }
}

export const RSVPServiceImpl = new RSVPService();

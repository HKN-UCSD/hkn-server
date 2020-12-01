import { InductionClass } from '@Entities';
import { getRepository } from 'typeorm';

export class InductionClassService {
  /**
   * Get event with given id. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to fetch.
   * @returns {Promise} Event with given id.
   */
  async getInterviewDatesByQuarter(quarter: string): Promise<Date[] | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const inductionclass = await inductionClassRepository.findOne({ quarter });

    return inductionclass.interviewDates;
  }
}
export const InductionClassServiceImpl = new InductionClassService();

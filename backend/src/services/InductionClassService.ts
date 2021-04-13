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

  /**
   * Gets the year with given induction quarter.
   *
   * @param quarter quarter to check
   * @returns {Promise} year of quarter
   */
  async getYearByQuarter(quarter: string): Promise<string | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const inductionclass = await inductionClassRepository.findOne({ quarter });

    return inductionclass.year;
  }

  /**
   * Gets the date ranges of all the quarters in the same year as the given quarter.
   *
   * @param quarter quarter to check
   * @returns {Promise} list of string lists denoting ranges of dates for each quarter
   */
  async getYearDatesByQuarter(quarter: string): Promise<string[][] | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const inductionclass = await inductionClassRepository.findOne({ quarter });

    const quarters_list = await inductionClassRepository.find({ year: inductionclass.year });
    return quarters_list.map(q => {
      return [q.startDate, q.endDate];
    });
  }
}
export const InductionClassServiceImpl = new InductionClassService();

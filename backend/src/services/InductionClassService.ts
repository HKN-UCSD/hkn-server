import { getRepository, FindManyOptions } from 'typeorm';
import { parseISO, isSameYear, compareAsc } from 'date-fns';

import { InductionClass } from '@Entities';
import { MultipleInductionClassQuery } from '@Payloads';

export class InductionClassService {
  private buildMultipleInductionClassQuery(
    multipleInductionClassQuery: MultipleInductionClassQuery
  ): FindManyOptions<InductionClass> {
    // Worry about filter by startYear and endYear later
    const { startYear, endYear, showAffiliates } = multipleInductionClassQuery;
    const query: FindManyOptions<InductionClass> = {
      order: {
        startDate: 'ASC',
      },
    };

    if (showAffiliates) {
      query.relations = ['affiliates'];
    }

    return query;
  }

  async getMultipleInductionClasses(
    multipleInductionClassQuery: MultipleInductionClassQuery
  ): Promise<InductionClass[]> {
    const inductionClassRepository = getRepository(InductionClass);
    const query = this.buildMultipleInductionClassQuery(multipleInductionClassQuery);

    return inductionClassRepository.find(query);
  }

  async getCurrentInductionClass(): Promise<InductionClass | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const allInductionClasses = await inductionClassRepository.find({
      order: {
        startDate: 'ASC',
      },
    });

    let selectedInductionClass = undefined;
    const currDate = new Date();

    // This assumes there is only one induction class per period of time,
    // so no overlapping induction classes. If there are overlapping induction
    // classes for some reason, this takes the first one.
    for (let i = 0; i < allInductionClasses.length; i++) {
      const currInductionClass = allInductionClasses[i];

      if (
        compareAsc(currDate, parseISO(currInductionClass.startDate)) >= 0 &&
        compareAsc(parseISO(currInductionClass.endDate), currDate) >= 0
      ) {
        selectedInductionClass = currInductionClass;
        break;
      }
    }

    return selectedInductionClass;
  }

  async getInductionClassByQuarter(quarter: string): Promise<InductionClass | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const upperCaseQtr = quarter.toUpperCase(); // quarter is stored in upper case in DB

    return inductionClassRepository.findOne(
      { quarter: upperCaseQtr },
      { relations: ['affiliates'] }
    );
  }

  async createInductionClass(inductionClass: InductionClass): Promise<InductionClass | undefined> {
    const inductionClassRepository = getRepository(InductionClass);

    try {
      await inductionClassRepository.insert(inductionClass);
    } catch {
      return undefined;
    }

    return inductionClass;
  }

  async saveInductionClass(inductionClass: InductionClass): Promise<InductionClass> {
    const inductionClassRepository = getRepository(InductionClass);
    return inductionClassRepository.save(inductionClass);
  }

  async deleteInductionClassByQuarter(quarter: string): Promise<InductionClass | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const inductionClass = await this.getInductionClassByQuarter(quarter);

    return inductionClass ? inductionClassRepository.remove(inductionClass) : undefined;
  }

  /**
   * Get event with given id. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to fetch.
   * @returns {Promise} Event with given id.
   */
  async getInterviewDatesByQuarter(quarter: string): Promise<string[] | undefined> {
    const inductionClass = await this.getInductionClassByQuarter(quarter);
    return inductionClass?.interviewDates;
  }
}
export const InductionClassServiceImpl = new InductionClassService();

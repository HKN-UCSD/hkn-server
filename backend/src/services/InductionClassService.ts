import { getRepository, FindManyOptions } from 'typeorm';
import { parseISO, isSameYear, compareAsc } from 'date-fns';

import { InductionClass } from '@Entities';
import { MultipleInductionClassQuery } from '@Payloads';

export class InductionClassService {
  async getMultipleInductionClasses(
    multipleInductionClassQuery: MultipleInductionClassQuery
  ): Promise<InductionClass[]> {
    const inductionClassRepository = getRepository(InductionClass);
    const { startYear, endYear, showAffiliates } = multipleInductionClassQuery;
    const query: FindManyOptions<InductionClass> = {};

    if (showAffiliates) {
      query.relations = ['affiliates'];
    }

    const allInductionClasses = await inductionClassRepository.find(query);
    let filteredInductionClasses = allInductionClasses;

    // Ignore all this date filter stuff, too tired will come back later after gathering requirements - Thai 08/26/2021
    const targetStartYear = new Date(startYear, 1, 1);
    const targetEndYear = new Date(endYear, 1, 1);
    const isStartYearPresent = startYear !== undefined;
    const isEndYearPresent = endYear !== undefined;

    if (isStartYearPresent) {
      filteredInductionClasses = allInductionClasses.filter((inductionClass: InductionClass) =>
        isSameYear(targetStartYear, parseISO(inductionClass.startDate))
      );
    }

    if (isEndYearPresent) {
      let toFilter = allInductionClasses;

      if (isStartYearPresent) {
        toFilter = filteredInductionClasses;
      }

      filteredInductionClasses = toFilter.filter((inductionClass: InductionClass) =>
        isSameYear(targetEndYear, parseISO(inductionClass.endDate))
      );
    }

    return filteredInductionClasses;
  }

  async getCurrentInductionClass(): Promise<InductionClass | undefined> {
    const inductionClassRepository = getRepository(InductionClass);
    const allInductionClasses = await inductionClassRepository.find();

    const currDate = new Date();
    const currentInductionClass = allInductionClasses.filter(
      (inductionClass: InductionClass) =>
        compareAsc(currDate, parseISO(inductionClass.startDate)) == 1 &&
        compareAsc(parseISO(inductionClass.endDate), currDate)
    );

    if (currentInductionClass.length > 1 || currentInductionClass.length === 0) {
      return undefined;
    }

    return currentInductionClass[0];
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

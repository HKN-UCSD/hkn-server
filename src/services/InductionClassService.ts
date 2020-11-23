import { Event, AppUser, Attendance, RSVP, InductionClass } from '@Entities';
import { AttendanceService, AttendanceServiceImpl } from './AttendanceService';
import { RSVPService, RSVPServiceImpl } from './RSVPService';

import { getRepository } from 'typeorm';
import { MultipleAttendanceQuery } from '@Payloads';

export class InductionClassService {
  /**
   * Get event with given id. Returns undefined on invalid id.
   *
   * @param {number} id ID of event to fetch.
   * @returns {Promise} Event with given id.
   */
  async getInterviewDatesByQuarter(quarter: string): Promise<string | undefined> {
    const inductionClassRepository = getRepository(InductionClass);

    const inductionclass = await inductionClassRepository.findOne({ quarter });

    return inductionclass.interviewDates.toString();
  }
}
export const InductionClassServiceImpl = new InductionClassService();

import React, { useEffect, useContext, useState } from 'react';
import { compareAsc, differenceInDays, parseISO } from 'date-fns';

import SchedulersWithConfirmButton from './components/SchedulersWithConfirmButton';

import { UserContext } from '@Contexts';
import {
  AppUserProfileResponse,
  AppUserInterviewAvailability,
  InterviewDatesResponse,
} from '@Services/api';
import { InterviewWeekStartDate } from '@Services/api/models';
import { getUserProfile } from '@Services/UserService';
import { getInterviewStartDates } from '@Services/InductionClassService';

function splitScheduleByWeek(
  interviewStartWeek: Date[],
  userSchedule: Date[]
): Date[][] {
  const scheduleSplitByWeek: Date[][] = Array(interviewStartWeek.length).fill(
    []
  );

  for (let i = 0; i < userSchedule.length; i += 1) {
    const currUserDate = userSchedule[i];

    for (let j = 0; j < interviewStartWeek.length; j += 1) {
      const currStartWeek = interviewStartWeek[j];

      if (j < interviewStartWeek.length - 1) {
        const nextStartWeek = interviewStartWeek[j + 1];

        if (
          compareAsc(currUserDate, currStartWeek) >= 0 &&
          compareAsc(nextStartWeek, currUserDate) > 0
        ) {
          // scheduleSplitByWeek[j].push(currUserDate) doesn't work for some reason
          // (kept adding currUserDate to all Date[] elements in scheduleSplitByWeek),
          // so had to do this to get it to work
          const weekToChange = Array.from(scheduleSplitByWeek[j]);
          weekToChange.push(currUserDate);
          scheduleSplitByWeek[j] = weekToChange;
          break;
        }
      } else if (
        compareAsc(currUserDate, currStartWeek) >= 0 &&
        differenceInDays(currUserDate, currStartWeek) < 5
      ) {
        // Should be (diffInDays < numDays), where numDays is number of days to include in a week, but it is 5
        // right now because numDays for schedulers is 5 by default.
        const weekToChange = Array.from(scheduleSplitByWeek[j]);
        weekToChange.push(currUserDate);
        scheduleSplitByWeek[j] = weekToChange;
      }
    }
  }

  return scheduleSplitByWeek;
}

export default function InterviewSchedulingPage(): JSX.Element {
  const userContext = useContext(UserContext);
  const [existingUserSchedules, setExistingUserSchedules] = useState<Date[]>(
    []
  );
  const [interviewStartDates, setInterviewStartDates] = useState<Date[]>([]);

  useEffect(() => {
    const getUserFunc = async () => {
      if (userContext == null) {
        return;
      }
      const { userId } = userContext;
      const res: AppUserProfileResponse = await getUserProfile(
        parseInt(userId, 10)
      );
      const { availabilities } = res;
      if (availabilities == null) {
        setExistingUserSchedules([]);
        return;
      }

      const startDates = availabilities.map(
        (availability: AppUserInterviewAvailability) => {
          return parseISO(availability.start);
        }
      );

      setExistingUserSchedules(startDates);
    };
    getUserFunc();
  }, [userContext]);

  useEffect(() => {
    const getInterviewWeekStartDateFunc = async () => {
      // hardcoded induction class for now
      const res: InterviewDatesResponse = await getInterviewStartDates('FA20');
      const interviewStartDateObjs: Date[] = res.interviewWeeks.map(
        (interviewWeekStartDate: InterviewWeekStartDate) => {
          return parseISO(interviewWeekStartDate.startDate);
        }
      );
      setInterviewStartDates(interviewStartDateObjs);
    };
    getInterviewWeekStartDateFunc();
  }, []);

  // This will spawn N number of schedule selectors if there are N elements in startDates
  const scheduleByWeek = splitScheduleByWeek(
    interviewStartDates,
    existingUserSchedules
  );

  return (
    <SchedulersWithConfirmButton
      startDates={interviewStartDates}
      existingUserSchedule={scheduleByWeek}
    />
  );
}

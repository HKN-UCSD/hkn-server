import { IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class InterviewDatesResponse {
  @ValidateNested({ each: true })
  @Type(() => InterviewWeekStartDate)
  interviewWeeks: InterviewWeekStartDate[];
}

export class InterviewWeekStartDate {
  @IsDateString()
  startDate: string;
}

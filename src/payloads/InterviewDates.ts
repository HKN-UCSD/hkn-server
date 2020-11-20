import { IsArray } from 'class-validator';

export class InterviewDatesResponse {
  @IsArray()
  interview: Date[];
}

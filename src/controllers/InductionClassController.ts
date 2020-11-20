import { JsonController, Get, Param } from 'routing-controllers';

import { InductionClassService, InductionClassServiceImpl } from '@Services';

import { InterviewDatesResponse } from '@Payloads';
import { ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/api/inductionclass')
export class InductionClassController {
  constructor(private inductionClassService: InductionClassService) {}

  @Get('/:inductionClassID/interviewdates')
  @ResponseSchema(InterviewDatesResponse)
  async getInterviewDates(
    @Param('inductionClassID') quarter: string
  ): Promise<InterviewDatesResponse> {
    const interviewDates: Date[] = await this.inductionClassService.getInterviewDatesByQuarter(
      quarter
    );

    const interviewDatesResponse = new InterviewDatesResponse();
    interviewDatesResponse.interview = interviewDates;
    return interviewDatesResponse;
  }
}

export const InductionClassControllerImpl = new InductionClassController(InductionClassServiceImpl);

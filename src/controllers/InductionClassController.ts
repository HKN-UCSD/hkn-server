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
      // e.g. converting from fa20 to FA20 to transform the string in the url to the
      // format used to store the quarter string in the datbase
      quarter.toUpperCase()
    );

    const interviewDatesResponse = new InterviewDatesResponse();
    interviewDatesResponse.interview = interviewDates.toString();
    return interviewDatesResponse;
  }
}

export const InductionClassControllerImpl = new InductionClassController(InductionClassServiceImpl);

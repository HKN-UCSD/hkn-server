import { JsonController, Get, Param } from 'routing-controllers';

import { InductionClassService, InductionClassServiceImpl } from '@Services';

import { InterviewDatesResponse } from '@Payloads';
import { ResponseSchema } from 'routing-controllers-openapi';
import { LogMethod } from '@Decorators';
import { ENDPOINT_HANDLER } from '@Logger';

const inductionClassEndpointRoute = (ending: string) => {
  return `/api/inductionclass${ending}`;
};

@JsonController('/api/inductionclass')
export class InductionClassController {
  constructor(private inductionClassService: InductionClassService) {}

  @Get('/:inductionClassID/interviewdates')
  @ResponseSchema(InterviewDatesResponse)
  @LogMethod(
    ENDPOINT_HANDLER,
    'info',
    'Requested endpoint to get the interview dates of an HKN affiliate',
    {
      endpointRoute: inductionClassEndpointRoute('/:inductionClassID/interviewdates'),
      method: 'GET',
    }
  )
  async getInterviewDates(
    @Param('inductionClassID') quarter: string
  ): Promise<InterviewDatesResponse> {
    const interviewDates: Date[] = await this.inductionClassService.getInterviewDatesByQuarter(
      // e.g. converting from fa20 to FA20 to transform the string in the url to the
      // format used to store the quarter string in the datbase
      quarter.toUpperCase()
    );

    const interviewDateStrings = interviewDates.map(interviewDate => {
      // Jank type assertion for it to work, will need to come back to this later - Thai 12/01/20
      const interviewDateString = { startDate: (interviewDate as unknown) as string };
      return interviewDateString;
    });

    const interviewDatesResponse = new InterviewDatesResponse();
    interviewDatesResponse.interviewWeeks = interviewDateStrings;

    return interviewDatesResponse;
  }
}

export const InductionClassControllerImpl = new InductionClassController(InductionClassServiceImpl);

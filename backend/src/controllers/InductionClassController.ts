import { JsonController, Body, Param, Get, Post, UseBefore, QueryParams, Delete } from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { InductionClassService, InductionClassServiceImpl } from '@Services';
import {
  InductionClassRequest,
  InductionClassResponse,
  InterviewDatesResponse,
  MultipleInductionClassResponse,
  MultipleInductionClassQuery,
  InductionClassUpdateRequest
} from '@Payloads';
import { OfficerAuthMiddleware } from '@Middlewares';
import { InductionClassMapper, InductionClassMapperImpl } from '@Mappers';

@JsonController('/api/inductionclass')
export class InductionClassController {
  constructor(private inductionClassService: InductionClassService, private inductionClassMapper: InductionClassMapper) { }

  @Get('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(MultipleInductionClassResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getMultipleInductionClasses(
    @QueryParams() multipleInductionClassQuery: MultipleInductionClassQuery
  ): Promise<MultipleInductionClassResponse> {
    const multipleInductionClasses = await this.inductionClassService.getMultipleInductionClasses(multipleInductionClassQuery);
    return { inductionClasses: multipleInductionClasses };
  }

  @Post('/')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(InductionClassResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async createInductionClass(@Body() inductionClassRequest: InductionClassRequest): Promise<InductionClassResponse> {
    const newInductionClass = this.inductionClassMapper.requestToNewEntity(inductionClassRequest);
    const createdInductionClass = await this.inductionClassService.createInductionClass(newInductionClass);

    if (createdInductionClass === undefined) {
      return undefined;
    }

    return this.inductionClassMapper.entityToResponse(createdInductionClass);
  }

  @Get('/current')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(InductionClassResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getCurrentInductionClass(): Promise<InductionClassResponse> {
    const currentInductionClass = await this.inductionClassService.getCurrentInductionClass();
    return this.inductionClassMapper.entityToResponse(currentInductionClass);
  }

  @Get('/:inductionClassId')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(InductionClassResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getInductionClassByQuarter(@Param('inductionClassId') quarter: string): Promise<InductionClassResponse> {
    const inductionClass = await this.inductionClassService.getInductionClassByQuarter(quarter);
    return inductionClass === undefined ? undefined : this.inductionClassMapper.entityToResponse(inductionClass);
  }

  @Post('/:inductionClassId')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(InductionClassResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async updateInductionClass(
    @Body() inductionClassUpdateRequest: InductionClassUpdateRequest,
    @Param('inductionClassId') quarter: string
  ): Promise<InductionClassResponse | undefined> {
    const inductionClassToUpdate = {
      ...inductionClassUpdateRequest,
      quarter: quarter.toUpperCase(),
    }
    const updatedInductionClass = await this.inductionClassMapper.requestToExistingEntity(inductionClassToUpdate);

    if (updatedInductionClass === undefined) {
      return undefined
    }

    const savedInductionClass = await this.inductionClassService.saveInductionClass(updatedInductionClass);
    return this.inductionClassMapper.entityToResponse(savedInductionClass);
  }

  @Delete('/:inductionClassId')
  @UseBefore(OfficerAuthMiddleware)
  @ResponseSchema(InductionClassResponse)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async deleteInductionClass(@Param('inductionClassId') quarter: string): Promise<InductionClassResponse | undefined> {
    const deletedInductionClass = await this.inductionClassService.deleteInductionClassByQuarter(quarter);

    if (deletedInductionClass === undefined) {
      return undefined;
    }

    return this.inductionClassMapper.entityToResponse(deletedInductionClass);
  }

  @Get('/:inductionClassID/interviewdates')
  @ResponseSchema(InterviewDatesResponse)
  async getInterviewDates(
    @Param('inductionClassID') quarter: string
  ): Promise<InterviewDatesResponse> {
    const interviewDates: string[] = await this.inductionClassService.getInterviewDatesByQuarter(quarter);
    const interviewDateStrings = interviewDates.map(interviewDate => {
      const interviewDateString = { startDate: interviewDate };
      return interviewDateString;
    });

    const interviewDatesResponse = new InterviewDatesResponse();
    interviewDatesResponse.interviewWeeks = interviewDateStrings;

    return interviewDatesResponse;
  }
}

export const InductionClassControllerImpl = new InductionClassController(InductionClassServiceImpl, InductionClassMapperImpl);

import { JsonController, Get, UseBefore } from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AppUserService, AppUserServiceImpl } from '@Services';
import { OfficerAuthMiddleware } from '@Middlewares';
import { MultipleInducteePointsResponse, InducteePointsResponse } from '@Payloads';
import { InducteePointsView } from '@Entities';

@JsonController('/api/points')
export class PointsController {
  constructor(private appUserService: AppUserService) {}

  @Get('/inductees')
  @ResponseSchema(MultipleInducteePointsResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getAllInducteePoints(): Promise<MultipleInducteePointsResponse> {
    const points: InducteePointsView[] = await this.appUserService.getAllInducteePoints();

    const pointResponses = points.map((point: InducteePointsView) => {
      const res = new InducteePointsResponse();
      res.points = point.points;

      // man i hate this
      res.user = point.user;
      res.email = point.email;
      res.hasMentorshipRequirement = point.hasMentorshipRequirement;
      res.hasProfessionalRequirement = point.hasProfessionalRequirement;
      res.year = point.eventYear;
      return res;
    });

    const multiplePointResponse = new MultipleInducteePointsResponse();
    multiplePointResponse.inducteePoints = pointResponses;

    return multiplePointResponse;
  }
}

export const PointsControllerImpl = new PointsController(AppUserServiceImpl);

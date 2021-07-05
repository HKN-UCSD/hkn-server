import { JsonController, Get, UseBefore } from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AppUserService, AppUserServiceImpl } from '@Services';
import { OfficerAuthMiddleware } from '@Middlewares';
import { MultipleInducteePointsResponse, InducteePointsResponse, AppUserResponse } from '@Payloads';
import { InducteePointsView } from '@Entities';
import { LogMethod } from '@Decorators';
import { ENDPOINT_HANDLER } from '@Logger';

const pointsEndpointRoute = (ending: string) => {
  return `/api/points${ending}`;
};

@JsonController('/api/points')
export class PointsController {
  constructor(private appUserService: AppUserService) {}

  @Get('/inductees')
  @ResponseSchema(MultipleInducteePointsResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  @LogMethod(
    ENDPOINT_HANDLER,
    'info',
    'Requested endpoint to get all event points from all inductees',
    { endpointRoute: pointsEndpointRoute('/inductees'), method: 'GET' }
  )
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
      return res;
    });

    const multiplePointResponse = new MultipleInducteePointsResponse();
    multiplePointResponse.inducteePoints = pointResponses;

    return multiplePointResponse;
  }
}

export const PointsControllerImpl = new PointsController(AppUserServiceImpl);

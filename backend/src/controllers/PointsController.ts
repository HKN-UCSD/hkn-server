import { JsonController, Get, UseBefore } from 'routing-controllers';
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi';

import { AppUserService, AppUserServiceImpl } from '@Services';
import { OfficerAuthMiddleware } from '@Middlewares';
import { MultipleInducteePointsResponse, InducteePointsResponse, AppUserResponse } from '@Payloads';
import { InducteePointsView } from '@Entities';
import { logEndpointHandler } from '@Logger';

const FILE_NAME = 'PointsController.ts'; // For logging
const ROUTE_PREFIX = '/api/points';

@JsonController('/api/points')
export class PointsController {
  constructor(private appUserService: AppUserService) {}

  @Get('/inductees')
  @ResponseSchema(MultipleInducteePointsResponse)
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getAllInducteePoints(): Promise<MultipleInducteePointsResponse> {
    logEndpointHandler('getAllInducteePoints', {}, FILE_NAME, `${ROUTE_PREFIX}/inductees`, 'GET');

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

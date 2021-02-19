import { PointsApi } from './api/apis/PointsApi';
import ApiConfigStore from './ApiConfigStore';
import { InducteePointsResponse } from './api';

// nit: bad naming
export interface InducteePoint {
  user: number;
  email: string;
  points: number;
  hasProfessionalRequirement: string;
  hasMentorshipRequirement: string;
}

// nit: might be better to move the bool => string conversion out into page/component later
export async function getAllInducteePoints(): Promise<InducteePoint[]> {
  const apiConfig = await ApiConfigStore.getApiConfig();
  const pointsApi: PointsApi = new PointsApi(apiConfig);

  const points = await pointsApi.pointsControllerGetAllInducteePoints();
  return points.inducteePoints.map((point: InducteePointsResponse) => {
    return {
      points: point.points,
      user: point.user,
      email: point.email,
      hasProfessionalRequirement: point.hasProfessionalRequirement
        ? 'Complete'
        : 'Incomplete',
      hasMentorshipRequirement: point.hasMentorshipRequirement
        ? 'Complete'
        : 'Incomplete',
    } as InducteePoint;
  });
}

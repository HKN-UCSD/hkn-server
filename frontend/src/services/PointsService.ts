import { PointsApi } from './api/apis/PointsApi';
import ApiConfigStore from './ApiConfigStore';
import { InducteePointsResponse } from './api';
import { getUserById } from './UserService';

// nit: bad naming
export interface InducteePoint {
  user: number;
  name: string;
  email: string;
  points: number;
  hasProfessionalRequirement: string;
  hasMentorshipRequirement: string;
  hasTechnicalRequirement: string;
  hasSocialRequirement: string;
}

// nit: might be better to move the bool => string conversion out into page/component later
export async function getAllInducteePoints(): Promise<InducteePoint[]> {
  const apiConfig = await ApiConfigStore.getApiConfig();
  const pointsApi: PointsApi = new PointsApi(apiConfig);

  const points = await pointsApi.pointsControllerGetAllInducteePoints();
  return await Promise.all(points.inducteePoints.map(async (point: InducteePointsResponse) => {
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
      hasTechnicalRequirement: point.hasTechnicalRequirement
        ? 'Complete'
        : 'Incomplete',
      hasSocialRequirement: point.hasSocialRequirement
        ? 'Complete'
        : 'Incomplete',
      name: (await getUserById(point.user)).firstName + " " + (await getUserById(point.user)).lastName,
    };
  }));
}

import { PointsApi } from './api/apis/PointsApi';
import ApiConfigStore from './ApiConfigStore';
import { InducteePointsResponse, UserApi } from './api';
import { AppUserResponse } from './api';
import { isNamespaceImport } from 'typescript';
import { getUserById, getInductionPoints } from '@Services/UserService';

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
  const userInfo = await getUserById(point.user);
  const inducteePointsList = await Promise.all(points.inducteePoints.map(async (point: InducteePointsResponse) => {
    const userInfo = await getUserById(point.user);
    return {
      points: point.points,
      user: point.user,
      name: userInfo.firstName + ' ' + userInfo.lastName,
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
    } as InducteePoint;
  }));
  return inducteePointsList;
}

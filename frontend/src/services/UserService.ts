import {
  UserApi,
  UserControllerGetUserRoleRequest,
  UserControllerGetUserProfileRequest,
  UserControllerCreateUserRequest,
  UserControllerGetMultipleUsersRequest,
  UserControllerUpdateUserProfileRequest,
  UserControllerGetUserInducteePointsRequest,
  UserControllerUpdateUserInterviewAvailabilitiesRequest,
} from './api/apis/UserApi';
import {
  AppUserPostRequest,
  AppUserResponse,
  AppUserRolesResponse,
  AppUserProfileResponse,
  MultipleAppUserResponse,
  MultipleUserNameResponse,
  AppUserNameResponse,
  AppUserInducteePointsResponse,
  AppUserInterviewAvailabilitiesRequest,
} from './api/models';
import { Configuration } from './api/runtime';
import ApiConfigStore from './ApiConfigStore';

export { AppUserEventResponseRoleEnum as AppUserRoleEnum } from './api/models';

export interface InterviewAvailability {
  start: string;
  end: string;
}

export async function getUserProfile(
  userID: number
): Promise<AppUserProfileResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);
  const request: UserControllerGetUserProfileRequest = {
    userID,
  };

  return userApi.userControllerGetUserProfile(request);
}

export async function getMultipleUsers(
  queryParams: UserControllerGetMultipleUsersRequest
): Promise<MultipleAppUserResponse | MultipleUserNameResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);

  return userApi.userControllerGetMultipleUsers(queryParams);
}

export function getUserNames(
  multipleUserResponse: MultipleAppUserResponse | MultipleUserNameResponse
) {
  const { users } = multipleUserResponse;

  if (users.length === 0) {
    return [];
  }

  const userKeys = Object.keys(users[0]);

  if (
    userKeys.length === 3 &&
    userKeys.includes('firstName') &&
    userKeys.includes('lastName') &&
    userKeys.includes('id')
  ) {
    return users as AppUserNameResponse[];
  }
  return users as AppUserResponse[];
}

export async function createNewUser(
  appUserPostRequest: AppUserPostRequest
): Promise<AppUserResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);
  const request: UserControllerCreateUserRequest = {
    appUserPostRequest,
  };

  return userApi.userControllerCreateUser(request);
}

export async function updateUserProfile(
  userID: number,
  appUserPostRequest: AppUserPostRequest
) {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);
  const request: UserControllerUpdateUserProfileRequest = {
    userID,
    appUserPostRequest,
  };

  return userApi.userControllerUpdateUserProfile(request);
}

export async function getUserRole(
  userID: number
): Promise<AppUserRolesResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);
  const request: UserControllerGetUserRoleRequest = {
    userID,
  };

  return userApi.userControllerGetUserRole(request);
}

export async function getInductionPoints(
  userID: number
): Promise<AppUserInducteePointsResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);

  const request: UserControllerGetUserInducteePointsRequest = {
    userID,
  };

  return userApi.userControllerGetUserInducteePoints(request);
}

export async function updateUserInterviewAvailabilities(
  userID: number,
  interviewAvailability: InterviewAvailability[]
): Promise<AppUserResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);

  const availabilitiesRequest: AppUserInterviewAvailabilitiesRequest = {
    availabilities: interviewAvailability,
  };

  const request: UserControllerUpdateUserInterviewAvailabilitiesRequest = {
    userID,
    appUserInterviewAvailabilitiesRequest: availabilitiesRequest,
  };

  return userApi.userControllerUpdateUserInterviewAvailabilities(request);
}

/* tslint:disable */
/* eslint-disable */
/**
 * HKN API
 * HKN API
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import {
  AppUserInducteePointsResponse,
  AppUserInducteePointsResponseFromJSON,
  AppUserInducteePointsResponseToJSON,
  AppUserInterviewAvailabilitiesRequest,
  AppUserInterviewAvailabilitiesRequestFromJSON,
  AppUserInterviewAvailabilitiesRequestToJSON,
  AppUserMemberPointsResponse,
  AppUserMemberPointsResponseFromJSON,
  AppUserMemberPointsResponseToJSON,
  AppUserPostRequest,
  AppUserPostRequestFromJSON,
  AppUserPostRequestToJSON,
  AppUserResponse,
  AppUserResponseFromJSON,
  AppUserResponseToJSON,
  AppUserRolesResponse,
  AppUserRolesResponseFromJSON,
  AppUserRolesResponseToJSON,
  MultipleAppUserResponse,
  MultipleAppUserResponseFromJSON,
  MultipleAppUserResponseToJSON,
} from '../models';

export interface UserControllerCreateUserRequest {
  appUserPostRequest?: AppUserPostRequest;
}

export interface UserControllerDownloadResumeRequest {
  userID: number;
}

export interface UserControllerGetMultipleUsersRequest {
  officers?: boolean;
  names?: boolean;
}

export interface UserControllerGetUserByIdRequest {
  userID: number;
}

export interface UserControllerGetUserInducteePointsRequest {
  userID: number;
}

export interface UserControllerGetUserMemberPointsRequest {
  userID: number;
}

export interface UserControllerGetUserRoleRequest {
  userID: number;
}

export interface UserControllerUpdateUserByIdRequest {
  userID: number;
  appUserPostRequest?: AppUserPostRequest;
}

export interface UserControllerUpdateUserInterviewAvailabilitiesRequest {
  userID: number;
  appUserInterviewAvailabilitiesRequest?: AppUserInterviewAvailabilitiesRequest;
}

export interface UserControllerUploadResumeRequest {
  userID: number;
}

/**
 *
 */
export class UserApi extends runtime.BaseAPI {
  /**
   * Create user
   */
  async userControllerCreateUserRaw(
    requestParameters: UserControllerCreateUserRequest
  ): Promise<runtime.ApiResponse<AppUserResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: AppUserPostRequestToJSON(requestParameters.appUserPostRequest),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserResponseFromJSON(jsonValue)
    );
  }

  /**
   * Create user
   */
  async userControllerCreateUser(
    requestParameters: UserControllerCreateUserRequest
  ): Promise<AppUserResponse> {
    const response = await this.userControllerCreateUserRaw(requestParameters);
    return await response.value();
  }

  /**
   * Download resume
   */
  async userControllerDownloadResumeRaw(
    requestParameters: UserControllerDownloadResumeRequest
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerDownloadResume.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}/resume`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Download resume
   */
  async userControllerDownloadResume(
    requestParameters: UserControllerDownloadResumeRequest
  ): Promise<void> {
    await this.userControllerDownloadResumeRaw(requestParameters);
  }

  /**
   * Get multiple users
   */
  async userControllerGetMultipleUsersRaw(
    requestParameters: UserControllerGetMultipleUsersRequest
  ): Promise<runtime.ApiResponse<MultipleAppUserResponse>> {
    const queryParameters: any = {};

    if (requestParameters.officers !== undefined) {
      queryParameters['officers'] = requestParameters.officers;
    }

    if (requestParameters.names !== undefined) {
      queryParameters['names'] = requestParameters.names;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/`,
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      MultipleAppUserResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get multiple users
   */
  async userControllerGetMultipleUsers(
    requestParameters: UserControllerGetMultipleUsersRequest
  ): Promise<MultipleAppUserResponse> {
    const response = await this.userControllerGetMultipleUsersRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Get user by id
   */
  async userControllerGetUserByIdRaw(
    requestParameters: UserControllerGetUserByIdRequest
  ): Promise<runtime.ApiResponse<AppUserResponse>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerGetUserById.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get user by id
   */
  async userControllerGetUserById(
    requestParameters: UserControllerGetUserByIdRequest
  ): Promise<AppUserResponse> {
    const response = await this.userControllerGetUserByIdRaw(requestParameters);
    return await response.value();
  }

  /**
   * Get user inductee points
   */
  async userControllerGetUserInducteePointsRaw(
    requestParameters: UserControllerGetUserInducteePointsRequest
  ): Promise<runtime.ApiResponse<AppUserInducteePointsResponse>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerGetUserInducteePoints.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}/inductee-points`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserInducteePointsResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get user inductee points
   */
  async userControllerGetUserInducteePoints(
    requestParameters: UserControllerGetUserInducteePointsRequest
  ): Promise<AppUserInducteePointsResponse> {
    const response = await this.userControllerGetUserInducteePointsRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Get user member points
   */
  async userControllerGetUserMemberPointsRaw(
    requestParameters: UserControllerGetUserMemberPointsRequest
  ): Promise<runtime.ApiResponse<AppUserMemberPointsResponse>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerGetUserMemberPoints.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}/member-points`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserMemberPointsResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get user member points
   */
  async userControllerGetUserMemberPoints(
    requestParameters: UserControllerGetUserMemberPointsRequest
  ): Promise<AppUserMemberPointsResponse> {
    const response = await this.userControllerGetUserMemberPointsRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Get user role
   */
  async userControllerGetUserRoleRaw(
    requestParameters: UserControllerGetUserRoleRequest
  ): Promise<runtime.ApiResponse<AppUserRolesResponse>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerGetUserRole.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}/roles`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'GET',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserRolesResponseFromJSON(jsonValue)
    );
  }

  /**
   * Get user role
   */
  async userControllerGetUserRole(
    requestParameters: UserControllerGetUserRoleRequest
  ): Promise<AppUserRolesResponse> {
    const response = await this.userControllerGetUserRoleRaw(requestParameters);
    return await response.value();
  }

  /**
   * Update user by id
   */
  async userControllerUpdateUserByIdRaw(
    requestParameters: UserControllerUpdateUserByIdRequest
  ): Promise<runtime.ApiResponse<AppUserResponse>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerUpdateUserById.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: AppUserPostRequestToJSON(requestParameters.appUserPostRequest),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserResponseFromJSON(jsonValue)
    );
  }

  /**
   * Update user by id
   */
  async userControllerUpdateUserById(
    requestParameters: UserControllerUpdateUserByIdRequest
  ): Promise<AppUserResponse> {
    const response = await this.userControllerUpdateUserByIdRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Update user interview availabilities
   */
  async userControllerUpdateUserInterviewAvailabilitiesRaw(
    requestParameters: UserControllerUpdateUserInterviewAvailabilitiesRequest
  ): Promise<runtime.ApiResponse<AppUserResponse>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerUpdateUserInterviewAvailabilities.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}/interview-availabilities`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: AppUserInterviewAvailabilitiesRequestToJSON(
        requestParameters.appUserInterviewAvailabilitiesRequest
      ),
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      AppUserResponseFromJSON(jsonValue)
    );
  }

  /**
   * Update user interview availabilities
   */
  async userControllerUpdateUserInterviewAvailabilities(
    requestParameters: UserControllerUpdateUserInterviewAvailabilitiesRequest
  ): Promise<AppUserResponse> {
    const response = await this.userControllerUpdateUserInterviewAvailabilitiesRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Upload resume
   */
  async userControllerUploadResumeRaw(
    requestParameters: UserControllerUploadResumeRequest
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.userID === null ||
      requestParameters.userID === undefined
    ) {
      throw new runtime.RequiredError(
        'userID',
        'Required parameter requestParameters.userID was null or undefined when calling userControllerUploadResume.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString =
        typeof token === 'function' ? token('TokenAuth', []) : token;

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/users/{userID}/resume`.replace(
        `{${'userID'}}`,
        encodeURIComponent(String(requestParameters.userID))
      ),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Upload resume
   */
  async userControllerUploadResume(
    requestParameters: UserControllerUploadResumeRequest
  ): Promise<void> {
    await this.userControllerUploadResumeRaw(requestParameters);
  }
}

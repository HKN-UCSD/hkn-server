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
    AppUserResponse,
    AppUserResponseFromJSON,
    AppUserResponseToJSON,
    AppUserSignupRequest,
    AppUserSignupRequestFromJSON,
    AppUserSignupRequestToJSON,
} from '../models';

export interface AuthControllerInducteeSignUpRequest {
    appUserSignupRequest?: AppUserSignupRequest;
}

export interface AuthControllerSignUpUserRequest {
    appUserSignupRequest?: AppUserSignupRequest;
}

/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Inductee sign up
     */
    async authControllerInducteeSignUpRaw(requestParameters: AuthControllerInducteeSignUpRequest): Promise<runtime.ApiResponse<AppUserResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/auth/inductee-signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppUserSignupRequestToJSON(requestParameters.appUserSignupRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AppUserResponseFromJSON(jsonValue));
    }

    /**
     * Inductee sign up
     */
    async authControllerInducteeSignUp(requestParameters: AuthControllerInducteeSignUpRequest): Promise<AppUserResponse> {
        const response = await this.authControllerInducteeSignUpRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sign up user
     */
    async authControllerSignUpUserRaw(requestParameters: AuthControllerSignUpUserRequest): Promise<runtime.ApiResponse<AppUserResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/auth/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppUserSignupRequestToJSON(requestParameters.appUserSignupRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AppUserResponseFromJSON(jsonValue));
    }

    /**
     * Sign up user
     */
    async authControllerSignUpUser(requestParameters: AuthControllerSignUpUserRequest): Promise<AppUserResponse> {
        const response = await this.authControllerSignUpUserRaw(requestParameters);
        return await response.value();
    }

}

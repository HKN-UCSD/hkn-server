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
    MultipleInducteePointsResponse,
    MultipleInducteePointsResponseFromJSON,
    MultipleInducteePointsResponseToJSON,
} from '../models';

/**
 * 
 */
export class PointsApi extends runtime.BaseAPI {

    /**
     * Get all inductee points
     */
    async pointsControllerGetAllInducteePointsRaw(): Promise<runtime.ApiResponse<MultipleInducteePointsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/points/inductees`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MultipleInducteePointsResponseFromJSON(jsonValue));
    }

    /**
     * Get all inductee points
     */
    async pointsControllerGetAllInducteePoints(): Promise<MultipleInducteePointsResponse> {
        const response = await this.pointsControllerGetAllInducteePointsRaw();
        return await response.value();
    }

}

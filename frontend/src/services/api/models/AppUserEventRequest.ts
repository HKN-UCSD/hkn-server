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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AppUserEventRequest
 */
export interface AppUserEventRequest {
    /**
     * 
     * @type {string}
     * @memberof AppUserEventRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserEventRequest
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserEventRequest
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserEventRequest
     */
    major: string;
}

export function AppUserEventRequestFromJSON(json: any): AppUserEventRequest {
    return AppUserEventRequestFromJSONTyped(json, false);
}

export function AppUserEventRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppUserEventRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'major': json['major'],
    };
}

export function AppUserEventRequestToJSON(value?: AppUserEventRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'firstName': value.firstName,
        'lastName': value.lastName,
        'major': value.major,
    };
}



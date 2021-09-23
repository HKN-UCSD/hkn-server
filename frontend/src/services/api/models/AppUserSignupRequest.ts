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
 * @interface AppUserSignupRequest
 */
export interface AppUserSignupRequest {
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    major: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    graduationYear: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    preferredName?: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    pronoun?: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    customPronoun?: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserSignupRequest
     */
    infoSession: string;
    /**
     * 
     * @type {boolean}
     * @memberof AppUserSignupRequest
     */
    courseRequirement: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AppUserSignupRequest
     */
    newsletter: boolean;
}

export function AppUserSignupRequestFromJSON(json: any): AppUserSignupRequest {
    return AppUserSignupRequestFromJSONTyped(json, false);
}

export function AppUserSignupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppUserSignupRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'major': json['major'],
        'graduationYear': json['graduationYear'],
        'password': json['password'],
        'preferredName': !exists(json, 'preferredName') ? undefined : json['preferredName'],
        'pronoun': !exists(json, 'pronoun') ? undefined : json['pronoun'],
        'customPronoun': !exists(json, 'customPronoun') ? undefined : json['customPronoun'],
        'infoSession': json['infoSession'],
        'courseRequirement': json['courseRequirement'],
        'newsletter': json['newsletter'],
    };
}

export function AppUserSignupRequestToJSON(value?: AppUserSignupRequest | null): any {
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
        'graduationYear': value.graduationYear,
        'password': value.password,
        'preferredName': value.preferredName,
        'pronoun': value.pronoun,
        'customPronoun': value.customPronoun,
        'infoSession': value.infoSession,
        'courseRequirement': value.courseRequirement,
        'newsletter': value.newsletter,
    };
}



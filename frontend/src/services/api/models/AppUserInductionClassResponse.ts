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
import {
    AppUserInductionClass,
    AppUserInductionClassFromJSON,
    AppUserInductionClassFromJSONTyped,
    AppUserInductionClassToJSON,
} from './';

/**
 * 
 * @export
 * @interface AppUserInductionClassResponse
 */
export interface AppUserInductionClassResponse {
    /**
     * 
     * @type {number}
     * @memberof AppUserInductionClassResponse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    major: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    graduationYear: string;
    /**
     * 
     * @type {AppUserInductionClass}
     * @memberof AppUserInductionClassResponse
     */
    inductionClass?: AppUserInductionClass;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    preferredName?: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    pronoun?: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    customPronoun?: string;
    /**
     * 
     * @type {string}
     * @memberof AppUserInductionClassResponse
     */
    infoSession?: string;
}

export function AppUserInductionClassResponseFromJSON(json: any): AppUserInductionClassResponse {
    return AppUserInductionClassResponseFromJSONTyped(json, false);
}

export function AppUserInductionClassResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppUserInductionClassResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'email': json['email'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'major': json['major'],
        'graduationYear': json['graduationYear'],
        'inductionClass': !exists(json, 'inductionClass') ? undefined : AppUserInductionClassFromJSON(json['inductionClass']),
        'preferredName': !exists(json, 'preferredName') ? undefined : json['preferredName'],
        'pronoun': !exists(json, 'pronoun') ? undefined : json['pronoun'],
        'customPronoun': !exists(json, 'customPronoun') ? undefined : json['customPronoun'],
        'infoSession': !exists(json, 'infoSession') ? undefined : json['infoSession'],
    };
}

export function AppUserInductionClassResponseToJSON(value?: AppUserInductionClassResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'email': value.email,
        'firstName': value.firstName,
        'lastName': value.lastName,
        'major': value.major,
        'graduationYear': value.graduationYear,
        'inductionClass': AppUserInductionClassToJSON(value.inductionClass),
        'preferredName': value.preferredName,
        'pronoun': value.pronoun,
        'customPronoun': value.customPronoun,
        'infoSession': value.infoSession,
    };
}



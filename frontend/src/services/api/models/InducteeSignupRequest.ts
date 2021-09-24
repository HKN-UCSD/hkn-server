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
 * @interface InducteeSignupRequest
 */
export interface InducteeSignupRequest {
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    major: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    graduationYear: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    preferredName?: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    pronoun?: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    customPronoun?: string;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    infoSession: string;
    /**
     * 
     * @type {boolean}
     * @memberof InducteeSignupRequest
     */
    courseRequirement: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof InducteeSignupRequest
     */
    newsletter: boolean;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    role?: InducteeSignupRequestRoleEnum;
    /**
     * 
     * @type {string}
     * @memberof InducteeSignupRequest
     */
    inductionClassQuarter?: string;
}

export function InducteeSignupRequestFromJSON(json: any): InducteeSignupRequest {
    return InducteeSignupRequestFromJSONTyped(json, false);
}

export function InducteeSignupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): InducteeSignupRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'major': json['major'],
        'graduationYear': json['graduationYear'],
        'preferredName': !exists(json, 'preferredName') ? undefined : json['preferredName'],
        'pronoun': !exists(json, 'pronoun') ? undefined : json['pronoun'],
        'customPronoun': !exists(json, 'customPronoun') ? undefined : json['customPronoun'],
        'infoSession': json['infoSession'],
        'courseRequirement': json['courseRequirement'],
        'newsletter': json['newsletter'],
        'role': !exists(json, 'role') ? undefined : json['role'],
        'inductionClassQuarter': !exists(json, 'inductionClassQuarter') ? undefined : json['inductionClassQuarter'],
    };
}

export function InducteeSignupRequestToJSON(value?: InducteeSignupRequest | null): any {
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
        'preferredName': value.preferredName,
        'pronoun': value.pronoun,
        'customPronoun': value.customPronoun,
        'infoSession': value.infoSession,
        'courseRequirement': value.courseRequirement,
        'newsletter': value.newsletter,
        'role': value.role,
        'inductionClassQuarter': value.inductionClassQuarter,
    };
}

/**
* @export
* @enum {string}
*/
export enum InducteeSignupRequestRoleEnum {
    Admin = 'admin',
    Officer = 'officer',
    Member = 'member',
    Inductee = 'inductee',
    Guest = 'guest'
}



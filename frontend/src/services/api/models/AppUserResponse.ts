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
  AppUserInterviewAvailability,
  AppUserInterviewAvailabilityFromJSON,
  AppUserInterviewAvailabilityFromJSONTyped,
  AppUserInterviewAvailabilityToJSON,
} from './';

/**
 *
 * @export
 * @interface AppUserResponse
 */
export interface AppUserResponse {
  /**
   *
   * @type {number}
   * @memberof AppUserResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof AppUserResponse
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof AppUserResponse
   */
  firstName: string;
  /**
   *
   * @type {string}
   * @memberof AppUserResponse
   */
  lastName: string;
  /**
   *
   * @type {string}
   * @memberof AppUserResponse
   */
  major: string;
  /**
   *
   * @type {string}
   * @memberof AppUserResponse
   */
  graduationYear: string;
  /**
   *
   * @type {AppUserInductionClass}
   * @memberof AppUserResponse
   */
  inductionClass?: AppUserInductionClass;
  /**
   *
   * @type {string}
   * @memberof AppUserResponse
   */
  role: AppUserResponseRoleEnum;
  /**
   *
   * @type {Array<AppUserInterviewAvailability>}
   * @memberof AppUserResponse
   */
  availabilities?: Array<AppUserInterviewAvailability>;
}

export function AppUserResponseFromJSON(json: any): AppUserResponse {
  return AppUserResponseFromJSONTyped(json, false);
}

export function AppUserResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AppUserResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    email: json['email'],
    firstName: json['firstName'],
    lastName: json['lastName'],
    major: json['major'],
    graduationYear: json['graduationYear'],
    inductionClass: !exists(json, 'inductionClass')
      ? undefined
      : AppUserInductionClassFromJSON(json['inductionClass']),
    role: json['role'],
    availabilities: !exists(json, 'availabilities')
      ? undefined
      : (json['availabilities'] as Array<any>).map(
          AppUserInterviewAvailabilityFromJSON
        ),
  };
}

export function AppUserResponseToJSON(value?: AppUserResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    email: value.email,
    firstName: value.firstName,
    lastName: value.lastName,
    major: value.major,
    graduationYear: value.graduationYear,
    inductionClass: AppUserInductionClassToJSON(value.inductionClass),
    role: value.role,
    availabilities:
      value.availabilities === undefined
        ? undefined
        : (value.availabilities as Array<any>).map(
            AppUserInterviewAvailabilityToJSON
          ),
  };
}

/**
 * @export
 * @enum {string}
 */
export enum AppUserResponseRoleEnum {
  Admin = 'admin',
  Officer = 'officer',
  Member = 'member',
  Inductee = 'inductee',
  Guest = 'guest',
}

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
  AppUserNameResponse,
  AppUserNameResponseFromJSON,
  AppUserNameResponseFromJSONTyped,
  AppUserNameResponseToJSON,
} from './';

/**
 *
 * @export
 * @interface MultipleUserNameResponse
 */
export interface MultipleUserNameResponse {
  /**
   *
   * @type {Array<AppUserNameResponse>}
   * @memberof MultipleUserNameResponse
   */
  users: Array<AppUserNameResponse>;
}

export function MultipleUserNameResponseFromJSON(
  json: any
): MultipleUserNameResponse {
  return MultipleUserNameResponseFromJSONTyped(json, false);
}

export function MultipleUserNameResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MultipleUserNameResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    users: (json['users'] as Array<any>).map(AppUserNameResponseFromJSON),
  };
}

export function MultipleUserNameResponseToJSON(
  value?: MultipleUserNameResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    users: (value.users as Array<any>).map(AppUserNameResponseToJSON),
  };
}

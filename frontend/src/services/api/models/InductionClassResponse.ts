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
  AppUserResponse,
  AppUserResponseFromJSON,
  AppUserResponseFromJSONTyped,
  AppUserResponseToJSON,
} from './';

/**
 *
 * @export
 * @interface InductionClassResponse
 */
export interface InductionClassResponse {
  /**
   *
   * @type {string}
   * @memberof InductionClassResponse
   */
  quarter: string;
  /**
   *
   * @type {string}
   * @memberof InductionClassResponse
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof InductionClassResponse
   */
  startDate: string;
  /**
   *
   * @type {string}
   * @memberof InductionClassResponse
   */
  endDate: string;
  /**
   *
   * @type {Array<string>}
   * @memberof InductionClassResponse
   */
  interviewDates?: Array<string>;
  /**
   *
   * @type {Array<AppUserResponse>}
   * @memberof InductionClassResponse
   */
  affiliates?: Array<AppUserResponse>;
}

export function InductionClassResponseFromJSON(
  json: any
): InductionClassResponse {
  return InductionClassResponseFromJSONTyped(json, false);
}

export function InductionClassResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): InductionClassResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    quarter: json['quarter'],
    name: json['name'],
    startDate: json['startDate'],
    endDate: json['endDate'],
    interviewDates: !exists(json, 'interviewDates')
      ? undefined
      : json['interviewDates'],
    affiliates: !exists(json, 'affiliates')
      ? undefined
      : (json['affiliates'] as Array<any>).map(AppUserResponseFromJSON),
  };
}

export function InductionClassResponseToJSON(
  value?: InductionClassResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    quarter: value.quarter,
    name: value.name,
    startDate: value.startDate,
    endDate: value.endDate,
    interviewDates: value.interviewDates,
    affiliates:
      value.affiliates === undefined
        ? undefined
        : (value.affiliates as Array<any>).map(AppUserResponseToJSON),
  };
}

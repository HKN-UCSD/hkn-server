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
 * @interface InductionClassUpdateRequest
 */
export interface InductionClassUpdateRequest {
  /**
   *
   * @type {string}
   * @memberof InductionClassUpdateRequest
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof InductionClassUpdateRequest
   */
  startDate: string;
  /**
   *
   * @type {string}
   * @memberof InductionClassUpdateRequest
   */
  endDate: string;
  /**
   *
   * @type {Array<string>}
   * @memberof InductionClassUpdateRequest
   */
  interviewDates?: Array<string>;
}

export function InductionClassUpdateRequestFromJSON(
  json: any
): InductionClassUpdateRequest {
  return InductionClassUpdateRequestFromJSONTyped(json, false);
}

export function InductionClassUpdateRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): InductionClassUpdateRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
    startDate: json['startDate'],
    endDate: json['endDate'],
    interviewDates: !exists(json, 'interviewDates')
      ? undefined
      : json['interviewDates'],
  };
}

export function InductionClassUpdateRequestToJSON(
  value?: InductionClassUpdateRequest | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    startDate: value.startDate,
    endDate: value.endDate,
    interviewDates: value.interviewDates,
  };
}

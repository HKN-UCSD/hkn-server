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
  AppUserPKPayload,
  AppUserPKPayloadFromJSON,
  AppUserPKPayloadFromJSONTyped,
  AppUserPKPayloadToJSON,
} from './';

/**
 *
 * @export
 * @interface EventRequest
 */
export interface EventRequest {
  /**
   *
   * @type {Array<AppUserPKPayload>}
   * @memberof EventRequest
   */
  hosts: Array<AppUserPKPayload>;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  location?: string;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  startDate: string;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  endDate: string;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  type?: EventRequestTypeEnum;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  fbURL?: string;
  /**
   *
   * @type {string}
   * @memberof EventRequest
   */
  canvaURL?: string;
}

export function EventRequestFromJSON(json: any): EventRequest {
  return EventRequestFromJSONTyped(json, false);
}

export function EventRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EventRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    hosts: (json['hosts'] as Array<any>).map(AppUserPKPayloadFromJSON),
    name: json['name'],
    description: json['description'],
    location: !exists(json, 'location') ? undefined : json['location'],
    startDate: json['startDate'],
    endDate: json['endDate'],
    type: !exists(json, 'type') ? undefined : json['type'],
    fbURL: !exists(json, 'fbURL') ? undefined : json['fbURL'],
    canvaURL: !exists(json, 'canvaURL') ? undefined : json['canvaURL'],
  };
}

export function EventRequestToJSON(value?: EventRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    hosts: (value.hosts as Array<any>).map(AppUserPKPayloadToJSON),
    name: value.name,
    description: value.description,
    location: value.location,
    startDate: value.startDate,
    endDate: value.endDate,
    type: value.type,
    fbURL: value.fbURL,
    canvaURL: value.canvaURL,
  };
}

/**
 * @export
 * @enum {string}
 */
export enum EventRequestTypeEnum {
  Professional = 'professional',
  Social = 'social',
  Technical = 'technical',
  Mentorship = 'mentorship',
}

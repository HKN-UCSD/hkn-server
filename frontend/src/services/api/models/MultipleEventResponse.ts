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
    EventResponse,
    EventResponseFromJSON,
    EventResponseFromJSONTyped,
    EventResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface MultipleEventResponse
 */
export interface MultipleEventResponse {
    /**
     * 
     * @type {Array<EventResponse>}
     * @memberof MultipleEventResponse
     */
    events: Array<EventResponse>;
}

export function MultipleEventResponseFromJSON(json: any): MultipleEventResponse {
    return MultipleEventResponseFromJSONTyped(json, false);
}

export function MultipleEventResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultipleEventResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'events': ((json['events'] as Array<any>).map(EventResponseFromJSON)),
    };
}

export function MultipleEventResponseToJSON(value?: MultipleEventResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'events': ((value.events as Array<any>).map(EventResponseToJSON)),
    };
}



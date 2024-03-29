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
    InductionClassResponse,
    InductionClassResponseFromJSON,
    InductionClassResponseFromJSONTyped,
    InductionClassResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface MultipleInductionClassResponse
 */
export interface MultipleInductionClassResponse {
    /**
     * 
     * @type {Array<InductionClassResponse>}
     * @memberof MultipleInductionClassResponse
     */
    inductionClasses: Array<InductionClassResponse>;
}

export function MultipleInductionClassResponseFromJSON(json: any): MultipleInductionClassResponse {
    return MultipleInductionClassResponseFromJSONTyped(json, false);
}

export function MultipleInductionClassResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultipleInductionClassResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'inductionClasses': ((json['inductionClasses'] as Array<any>).map(InductionClassResponseFromJSON)),
    };
}

export function MultipleInductionClassResponseToJSON(value?: MultipleInductionClassResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'inductionClasses': ((value.inductionClasses as Array<any>).map(InductionClassResponseToJSON)),
    };
}



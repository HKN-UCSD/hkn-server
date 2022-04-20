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


import * as runtime from '../runtime';
import {
    AffiliateAttendanceResponse,
    AffiliateAttendanceResponseFromJSON,
    AffiliateAttendanceResponseToJSON,
    AppUserEventRequest,
    AppUserEventRequestFromJSON,
    AppUserEventRequestToJSON,
    AttendanceCheckOffRequest,
    AttendanceCheckOffRequestFromJSON,
    AttendanceCheckOffRequestToJSON,
    AttendanceResponse,
    AttendanceResponseFromJSON,
    AttendanceResponseToJSON,
    EventRequest,
    EventRequestFromJSON,
    EventRequestToJSON,
    EventResponse,
    EventResponseFromJSON,
    EventResponseToJSON,
    MultipleAttendanceResponse,
    MultipleAttendanceResponseFromJSON,
    MultipleAttendanceResponseToJSON,
    MultipleEventResponse,
    MultipleEventResponseFromJSON,
    MultipleEventResponseToJSON,
    MultipleRSVPResponse,
    MultipleRSVPResponseFromJSON,
    MultipleRSVPResponseToJSON,
    RSVPResponse,
    RSVPResponseFromJSON,
    RSVPResponseToJSON,
} from '../models';

export interface EventControllerAffiliateEventRSVPRequest {
    eventID: number;
}

export interface EventControllerAffiliateEventSigninRequest {
    eventID: number;
}

export interface EventControllerCheckOffEventAttendanceRequest {
    eventID: number;
    attendanceCheckOffRequest?: AttendanceCheckOffRequest;
}

export interface EventControllerCreateEventRequest {
    eventRequest?: EventRequest;
}

export interface EventControllerDeleteEventRequest {
    eventID: number;
}

export interface EventControllerGetAffiliateEventAttendanceRequest {
    eventID: number;
}

export interface EventControllerGetEventRequest {
    eventID: number;
}

export interface EventControllerGetEventAttendanceRequest {
    eventID: number;
    unchecked?: boolean;
    inductee?: boolean;
}

export interface EventControllerGetEventRSVPRequest {
    eventID: number;
}

export interface EventControllerGetMultipleEventsRequest {
    pending?: boolean;
    ready?: boolean;
    complete?: boolean;
}

export interface EventControllerRsvpForEventRequest {
    eventID: number;
    appUserEventRequest?: AppUserEventRequest;
}

export interface EventControllerSignInToEventRequest {
    eventID: number;
    appUserEventRequest?: AppUserEventRequest;
}

export interface EventControllerUpdateEventRequest {
    eventID: number;
    eventRequest?: EventRequest;
}

/**
 * 
 */
export class EventApi extends runtime.BaseAPI {

    /**
     * Affiliate event rsvp
     */
    async eventControllerAffiliateEventRSVPRaw(requestParameters: EventControllerAffiliateEventRSVPRequest): Promise<runtime.ApiResponse<RSVPResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerAffiliateEventRSVP.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/rsvp/affiliate`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RSVPResponseFromJSON(jsonValue));
    }

    /**
     * Affiliate event rsvp
     */
    async eventControllerAffiliateEventRSVP(requestParameters: EventControllerAffiliateEventRSVPRequest): Promise<RSVPResponse> {
        const response = await this.eventControllerAffiliateEventRSVPRaw(requestParameters);
        return await response.value();
    }

    /**
     * Affiliate event signin
     */
    async eventControllerAffiliateEventSigninRaw(requestParameters: EventControllerAffiliateEventSigninRequest): Promise<runtime.ApiResponse<AttendanceResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerAffiliateEventSignin.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/signin/affiliate`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AttendanceResponseFromJSON(jsonValue));
    }

    /**
     * Affiliate event signin
     */
    async eventControllerAffiliateEventSignin(requestParameters: EventControllerAffiliateEventSigninRequest): Promise<AttendanceResponse> {
        const response = await this.eventControllerAffiliateEventSigninRaw(requestParameters);
        return await response.value();
    }

    /**
     * Check off event attendance
     */
    async eventControllerCheckOffEventAttendanceRaw(requestParameters: EventControllerCheckOffEventAttendanceRequest): Promise<runtime.ApiResponse<AttendanceResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerCheckOffEventAttendance.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/attendance`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AttendanceCheckOffRequestToJSON(requestParameters.attendanceCheckOffRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AttendanceResponseFromJSON(jsonValue));
    }

    /**
     * Check off event attendance
     */
    async eventControllerCheckOffEventAttendance(requestParameters: EventControllerCheckOffEventAttendanceRequest): Promise<AttendanceResponse> {
        const response = await this.eventControllerCheckOffEventAttendanceRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create event
     */
    async eventControllerCreateEventRaw(requestParameters: EventControllerCreateEventRequest): Promise<runtime.ApiResponse<EventResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EventRequestToJSON(requestParameters.eventRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventResponseFromJSON(jsonValue));
    }

    /**
     * Create event
     */
    async eventControllerCreateEvent(requestParameters: EventControllerCreateEventRequest): Promise<EventResponse> {
        const response = await this.eventControllerCreateEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete event
     */
    async eventControllerDeleteEventRaw(requestParameters: EventControllerDeleteEventRequest): Promise<runtime.ApiResponse<EventResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerDeleteEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventResponseFromJSON(jsonValue));
    }

    /**
     * Delete event
     */
    async eventControllerDeleteEvent(requestParameters: EventControllerDeleteEventRequest): Promise<EventResponse> {
        const response = await this.eventControllerDeleteEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get affiliate event attendance
     */
    async eventControllerGetAffiliateEventAttendanceRaw(requestParameters: EventControllerGetAffiliateEventAttendanceRequest): Promise<runtime.ApiResponse<AffiliateAttendanceResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerGetAffiliateEventAttendance.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/signin/affiliate/attendance`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AffiliateAttendanceResponseFromJSON(jsonValue));
    }

    /**
     * Get affiliate event attendance
     */
    async eventControllerGetAffiliateEventAttendance(requestParameters: EventControllerGetAffiliateEventAttendanceRequest): Promise<AffiliateAttendanceResponse> {
        const response = await this.eventControllerGetAffiliateEventAttendanceRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get event
     */
    async eventControllerGetEventRaw(requestParameters: EventControllerGetEventRequest): Promise<runtime.ApiResponse<EventResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerGetEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/events/{eventID}`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventResponseFromJSON(jsonValue));
    }

    /**
     * Get event
     */
    async eventControllerGetEvent(requestParameters: EventControllerGetEventRequest): Promise<EventResponse> {
        const response = await this.eventControllerGetEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get event attendance
     */
    async eventControllerGetEventAttendanceRaw(requestParameters: EventControllerGetEventAttendanceRequest): Promise<runtime.ApiResponse<MultipleAttendanceResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerGetEventAttendance.');
        }

        const queryParameters: any = {};

        if (requestParameters.unchecked !== undefined) {
            queryParameters['unchecked'] = requestParameters.unchecked;
        }

        if (requestParameters.inductee !== undefined) {
            queryParameters['inductee'] = requestParameters.inductee;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/attendance`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MultipleAttendanceResponseFromJSON(jsonValue));
    }

    /**
     * Get event attendance
     */
    async eventControllerGetEventAttendance(requestParameters: EventControllerGetEventAttendanceRequest): Promise<MultipleAttendanceResponse> {
        const response = await this.eventControllerGetEventAttendanceRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get event rsvp
     */
    async eventControllerGetEventRSVPRaw(requestParameters: EventControllerGetEventRSVPRequest): Promise<runtime.ApiResponse<MultipleRSVPResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerGetEventRSVP.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/rsvp`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MultipleRSVPResponseFromJSON(jsonValue));
    }

    /**
     * Get event rsvp
     */
    async eventControllerGetEventRSVP(requestParameters: EventControllerGetEventRSVPRequest): Promise<MultipleRSVPResponse> {
        const response = await this.eventControllerGetEventRSVPRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get multiple events
     */
    async eventControllerGetMultipleEventsRaw(requestParameters: EventControllerGetMultipleEventsRequest): Promise<runtime.ApiResponse<MultipleEventResponse>> {
        const queryParameters: any = {};

        if (requestParameters.pending !== undefined) {
            queryParameters['pending'] = requestParameters.pending;
        }

        if (requestParameters.ready !== undefined) {
            queryParameters['ready'] = requestParameters.ready;
        }

        if (requestParameters.complete !== undefined) {
            queryParameters['complete'] = requestParameters.complete;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MultipleEventResponseFromJSON(jsonValue));
    }

    /**
     * Get multiple events
     */
    async eventControllerGetMultipleEvents(requestParameters: EventControllerGetMultipleEventsRequest): Promise<MultipleEventResponse> {
        const response = await this.eventControllerGetMultipleEventsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Rsvp for event
     */
    async eventControllerRsvpForEventRaw(requestParameters: EventControllerRsvpForEventRequest): Promise<runtime.ApiResponse<RSVPResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerRsvpForEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/rsvp`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppUserEventRequestToJSON(requestParameters.appUserEventRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RSVPResponseFromJSON(jsonValue));
    }

    /**
     * Rsvp for event
     */
    async eventControllerRsvpForEvent(requestParameters: EventControllerRsvpForEventRequest): Promise<RSVPResponse> {
        const response = await this.eventControllerRsvpForEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sign in to event
     */
    async eventControllerSignInToEventRaw(requestParameters: EventControllerSignInToEventRequest): Promise<runtime.ApiResponse<AttendanceResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerSignInToEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}/signin`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppUserEventRequestToJSON(requestParameters.appUserEventRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AttendanceResponseFromJSON(jsonValue));
    }

    /**
     * Sign in to event
     */
    async eventControllerSignInToEvent(requestParameters: EventControllerSignInToEventRequest): Promise<AttendanceResponse> {
        const response = await this.eventControllerSignInToEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update event
     */
    async eventControllerUpdateEventRaw(requestParameters: EventControllerUpdateEventRequest): Promise<runtime.ApiResponse<EventResponse>> {
        if (requestParameters.eventID === null || requestParameters.eventID === undefined) {
            throw new runtime.RequiredError('eventID','Required parameter requestParameters.eventID was null or undefined when calling eventControllerUpdateEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("TokenAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/events/{eventID}`.replace(`{${"eventID"}}`, encodeURIComponent(String(requestParameters.eventID))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EventRequestToJSON(requestParameters.eventRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventResponseFromJSON(jsonValue));
    }

    /**
     * Update event
     */
    async eventControllerUpdateEvent(requestParameters: EventControllerUpdateEventRequest): Promise<EventResponse> {
        const response = await this.eventControllerUpdateEventRaw(requestParameters);
        return await response.value();
    }

}

import {
  EventApi,
  EventControllerGetEventRequest,
  EventControllerCreateEventRequest,
  EventControllerDeleteEventRequest,
  EventControllerUpdateEventRequest,
  EventControllerSignInToEventRequest,
  EventControllerRsvpForEventRequest,
  EventControllerGetEventAttendanceRequest,
  EventControllerGetEventRSVPRequest,
  EventControllerCheckOffEventAttendanceRequest,
  EventControllerAffiliateEventSigninRequest,
  EventControllerAffiliateEventRSVPRequest,
  EventControllerGetMultipleEventsRequest,
} from './api/apis/EventApi';
import {
  MultipleEventResponse,
  EventResponse,
  EventRequest,
  AppUserEventRequest,
  AttendanceResponse,
  MultipleAttendanceResponse,
  MultipleRSVPResponse,
  RSVPResponse,
} from './api/models';
import ApiConfigStore from './ApiConfigStore';
import { Configuration } from './api/runtime';

export {
  EventRequestTypeEnum as EventTypeEnum,
  EventResponseStatusEnum as EventStatusEnum,
} from './api/models';

export async function getAllEvents(
  queryParams: EventControllerGetMultipleEventsRequest
): Promise<MultipleEventResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);

  return eventApi.eventControllerGetMultipleEvents(queryParams);
}

export async function getEventAttendances(
  eventID: number,
  unchecked?: boolean,
  inductee?: boolean
): Promise<MultipleAttendanceResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerGetEventAttendanceRequest = {
    eventID,
    unchecked,
    inductee,
  };

  return eventApi.eventControllerGetEventAttendance(request);
}

export async function getEventRSVPs(
  eventID: number
): Promise<MultipleRSVPResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerGetEventRSVPRequest = {
    eventID,
  };

  return eventApi.eventControllerGetEventRSVP(request);
}

export async function checkOffAttendance(
  eventID: number,
  attendeeID: number
): Promise<AttendanceResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerCheckOffEventAttendanceRequest = {
    eventID,
    attendanceCheckOffRequest: { attendeeId: attendeeID },
  };

  return eventApi.eventControllerCheckOffEventAttendance(request);
}

export async function getEventById(eventID: number): Promise<EventResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerGetEventRequest = {
    eventID,
  };
  return eventApi.eventControllerGetEvent(request);
}

export async function createEvent(
  eventRequest: EventRequest
): Promise<EventResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerCreateEventRequest = {
    eventRequest,
  };

  return eventApi.eventControllerCreateEvent(request);
}

export async function updateEvent(eventID: number, eventRequest: EventRequest) {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerUpdateEventRequest = {
    eventID,
    eventRequest,
  };

  return eventApi.eventControllerUpdateEvent(request);
}

export async function deleteEvent(eventID: number): Promise<EventResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerDeleteEventRequest = {
    eventID,
  };

  return eventApi.eventControllerDeleteEvent(request);
}

export async function signInToEvent(
  eventID: number,
  appUserEventRequest: AppUserEventRequest
): Promise<AttendanceResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerSignInToEventRequest = {
    eventID,
    appUserEventRequest,
  };

  return eventApi.eventControllerSignInToEvent(request);
}

export async function rsvpToEvent(
  eventID: number,
  appUserEventRequest: AppUserEventRequest
): Promise<RSVPResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerRsvpForEventRequest = {
    eventID,
    appUserEventRequest,
  };

  return eventApi.eventControllerRsvpForEvent(request);
}

export async function affiliateSignInToEvent(
  eventID: number
): Promise<AttendanceResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerAffiliateEventSigninRequest = {
    eventID,
  };

  return eventApi.eventControllerAffiliateEventSignin(request);
}

export async function affiliateRSVPToEvent(
  eventID: number
): Promise<RSVPResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerAffiliateEventRSVPRequest = {
    eventID,
  };

  return eventApi.eventControllerAffiliateEventRSVP(request);
}

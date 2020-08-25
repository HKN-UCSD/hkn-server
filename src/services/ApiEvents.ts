import { EventApi, EventControllerGetEventRequest } from './api/apis/EventApi';
import { MultipleEventResponse, EventResponse } from './api/models';
import ApiConfigStore from './ApiConfigStore';
import { Configuration } from './api/runtime';

export async function getAllEvents(): Promise<MultipleEventResponse> {
  const apiConfig: Configuration = ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  return eventApi.eventControllerGetMultipleEvents();
}

export async function getEventById(eventID: number): Promise<EventResponse> {
  const apiConfig: Configuration = ApiConfigStore.getApiConfig();
  const eventApi: EventApi = new EventApi(apiConfig);
  const request: EventControllerGetEventRequest = {
    eventID,
  };
  return eventApi.eventControllerGetEvent(request);
}

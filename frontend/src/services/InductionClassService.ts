import {
  InductionClassApi,
  InductionClassControllerGetInterviewDatesRequest,
  InductionClassControllerGetMultipleInductionClassesRequest,
  InductionClassControllerGetInductionClassByQuarterRequest,
  InductionClassControllerCreateInductionClassRequest,
  InductionClassControllerUpdateInductionClassRequest,
  InductionClassControllerDeleteInductionClassRequest,
} from './api/apis/InductionClassApi';
import {
  InductionClassRequest,
  InductionClassUpdateRequest,
  InductionClassResponse,
  MultipleInductionClassQuery,
  MultipleInductionClassResponse,
  InterviewDatesResponse,
} from './api/models';
import { Configuration } from './api/runtime';
import ApiConfigStore from './ApiConfigStore';

export {
  EventRequestTypeEnum as EventTypeEnum,
  EventResponseStatusEnum as EventStatusEnum,
} from './api/models';

export async function getMultipleInductionClasses(
  queryParams: MultipleInductionClassQuery
): Promise<MultipleInductionClassResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const request: InductionClassControllerGetMultipleInductionClassesRequest = {
    ...queryParams,
  };

  return inductionClassApi.inductionClassControllerGetMultipleInductionClasses(
    request
  );
}

export async function getInductionClassByQuarter(
  quarter: string
): Promise<InductionClassResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const request: InductionClassControllerGetInductionClassByQuarterRequest = {
    inductionClassId: quarter,
  };

  return inductionClassApi.inductionClassControllerGetInductionClassByQuarter(
    request
  );
}

export async function createInductionClass(
  inductionClassRequest: InductionClassRequest
): Promise<InductionClassResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const request: InductionClassControllerCreateInductionClassRequest = {
    inductionClassRequest,
  };

  return inductionClassApi.inductionClassControllerCreateInductionClass(
    request
  );
}

export async function updateInductionClass(
  quarter: string,
  inductionClassUpdateRequest: InductionClassUpdateRequest
): Promise<InductionClassResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const request: InductionClassControllerUpdateInductionClassRequest = {
    inductionClassId: quarter,
    inductionClassUpdateRequest,
  };

  return inductionClassApi.inductionClassControllerUpdateInductionClass(
    request
  );
}

export async function deleteInductionClass(
  quarter: string
): Promise<InductionClassResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const request: InductionClassControllerDeleteInductionClassRequest = {
    inductionClassId: quarter,
  };

  return inductionClassApi.inductionClassControllerDeleteInductionClass(
    request
  );
}

export async function getInterviewStartDates(
  quarter: string
): Promise<InterviewDatesResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const request: InductionClassControllerGetInterviewDatesRequest = {
    inductionClassID: quarter,
  };
  return inductionClassApi.inductionClassControllerGetInterviewDates(request);
}

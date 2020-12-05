import {
  InductionClassApi,
  InductionClassControllerGetInterviewDatesRequest,
} from './api/apis/InductionClassApi';
import { InterviewDatesResponse } from './api/models';
import { Configuration } from './api/runtime';
import ApiConfigStore from './ApiConfigStore';

export {
  EventRequestTypeEnum as EventTypeEnum,
  EventResponseStatusEnum as EventStatusEnum,
} from './api/models';

export async function getInterviewStartDates(
  inductionClassID: string
): Promise<InterviewDatesResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const inductionClassApi: InductionClassApi = new InductionClassApi(apiConfig);
  const req: InductionClassControllerGetInterviewDatesRequest = {
    inductionClassID,
  };
  return inductionClassApi.inductionClassControllerGetInterviewDates(req);
}

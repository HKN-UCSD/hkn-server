import { AuthApi, AuthControllerSignUpUserRequest } from './api/apis/AuthApi';
import { AppUserSignupRequest, AppUserResponse } from './api/models';
import ApiConfigStore from './ApiConfigStore';
import { Configuration } from './api/runtime';

export async function createNewUser(
  appUserSignupRequest: AppUserSignupRequest
): Promise<AppUserResponse> {
  const apiConfig: Configuration = await ApiConfigStore.getApiConfig();
  const authApi: AuthApi = new AuthApi(apiConfig);
  const request: AuthControllerSignUpUserRequest = { appUserSignupRequest };

  return authApi.authControllerSignUpUser(request);
}

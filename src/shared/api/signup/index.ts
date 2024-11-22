import { AxiosResponse } from 'axios';

import { axiosInstance } from '@shared/api/instance';
import { postOnboardingRequest, postOnboardingResponse } from './type';

export const postOnboarding = async ({ role }: postOnboardingRequest) => {
  const response = await axiosInstance.patch<
    postOnboardingRequest,
    AxiosResponse<postOnboardingResponse>
  >(`/auth/onboarding`, {
    role,
  });

  return response.data;
};

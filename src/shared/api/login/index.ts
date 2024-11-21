import { AxiosResponse } from 'axios';
import {
  postLoginRequestBody,
  PostLoginResponse,
} from '@shared/api/login/type';

import { axiosInstance } from '@shared/api/instance';

export const postSocialLogin = async ({
  platformType,
  code,
}: postLoginRequestBody) => {
  const response = await axiosInstance.post<
    postLoginRequestBody,
    AxiosResponse<PostLoginResponse>
  >(`/auth/social/login`, {
    platformType,
    code,
  });

  return response.data.data;
};

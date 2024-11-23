import { AxiosResponse } from 'axios';

import { axiosInstance } from '@shared/api/instance';
import { postMentoringRequest, postMentoringResponse } from '@shared/api/profile/type';

export const postMentoring = async ({
    mentorId,
}: postMentoringRequest) => {
  const response = await axiosInstance.post<
    postMentoringRequest,
    AxiosResponse<postMentoringResponse>
  >(`/mentorings`, {
    mentorId,
  });

  return response.data;
};

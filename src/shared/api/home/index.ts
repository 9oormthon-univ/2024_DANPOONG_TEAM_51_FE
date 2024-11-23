import { GetMentorsResponse } from '@shared/api/home/type';

import { axiosInstance } from '@shared/api/instance';

export const getMentors = async () => {
  const response = await axiosInstance.get<GetMentorsResponse>(`/mentors`);
  return response.data;
};

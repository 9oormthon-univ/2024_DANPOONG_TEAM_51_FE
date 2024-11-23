import { axiosInstance } from '@/shared/api/instance';
import { getUserInfoResponse } from '@/shared/api/user/type';

export const getUserInfo = async () => {
  const response = await axiosInstance.get<getUserInfoResponse>(`auth/me`);

  return response.data;
};

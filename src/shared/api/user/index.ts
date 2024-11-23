import { axiosInstance } from '@/shared/api/instance';

export const getUserInfo = async () => {
  const response = await axiosInstance.get(`auth/me`);

  return response;
};

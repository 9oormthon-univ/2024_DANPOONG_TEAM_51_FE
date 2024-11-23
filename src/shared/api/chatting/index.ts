import { axiosInstance } from '@/shared/api/instance';
import { getChattingMessageRequest } from '@/shared/api/chatting/type';

export const getChattingMessage = async ({ id }: getChattingMessageRequest) => {
  const response = await axiosInstance.get(`/rooms/${id}/messages`);
  return response;
};

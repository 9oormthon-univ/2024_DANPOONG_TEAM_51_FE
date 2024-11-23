import { axiosInstance } from '@/shared/api/instance';

import {
  getMentorRoomResponse,
  getMenteeRoomResponse,
} from '@/shared/api/chat/type';

export const getMentorsRooms = async () => {
  const response = await axiosInstance.get<getMentorRoomResponse>(
    `/mentors/me/rooms`
  );
  return response.data;
};

export const getMenteesRooms = async () => {
  const response = await axiosInstance.get<getMenteeRoomResponse>(
    `/mentors/me/rooms`
  );
  return response.data;
};

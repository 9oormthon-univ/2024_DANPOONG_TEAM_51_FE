import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Navigation from '@/page/component/navi/Navigation';
import { getUserInfo } from '@/shared/api/user';
import { getMenteesRooms, getMentorsRooms } from '@/shared/api/chat';
import { ProfileCardMento } from '@/page/component/ProfileCard';

interface RoomInfo {
  name: string;
  keyword: string;
  roomId: string;
}

const Chat = () => {
  const [isMentor, setIsMentor] = useState<boolean>(true);
  const [roomList, setRoomList] = useState<RoomInfo[]>([]);
  const navigate = useNavigate();

  const handleUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setIsMentor(response.data.role === 'MENTOR');
      setIsMentor(false);
      handleGetRooms();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRooms = async () => {
    try {
      let rooms: RoomInfo[] = [];
      if (isMentor) {
        const response = await getMentorsRooms();
        console.log(response.data); // 전체 데이터를 확인
        rooms = response.data.map((room) => ({
          roomId: room.id.toString(),
          name: room.menteeName,
          keyword: room.menteeKeywords.join(', '), // 키워드를 문자열로 변환
        }));
      } else {
        const response = await getMenteesRooms();
        console.log(response.data); // 전체 데이터를 확인
        rooms = response.data.map((room) => ({
          roomId: room.id.toString(),
          name: room.mentorName,
          keyword: room.mentorKeywords.join(', '), // 키워드를 문자열로 변환
        }));
      }
      setRoomList(rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const iRunOnlyOnce = () => {
    handleUserInfo();
    console.log(roomList);
  };
  useEffect(iRunOnlyOnce, []);

  const handleCardClick = (roomId: string) => {
    console.log(`Room ID clicked: ${roomId}`);
    navigate(`/chat/room/${roomId}`);
  };

  return (
    <>
      <Navigation title={'채팅'} isOnlyTitle={true}></Navigation>
      <St.ChatWrapper>
        {roomList.map((data) => (
          <ProfileCardMento
            key={data.roomId}
            name={data.name}
            keyword={data.keyword}
            onClick={() => handleCardClick(data.roomId)} // 클릭 이벤트 추가
          />
        ))}
      </St.ChatWrapper>
    </>
  );
};

const St = {
  ChatWrapper: styled.div`
    flex-grow: 1;
    display: flex;
    width: 353px;
    margin: 0 auto;
    height: 100%;
    padding-top: 124px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
};

export default Chat;

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

import Navigation from '@page/component/navi/Navigation';
import Chatting from './component/Chatting';
import ChattingMessageInput from './component/ChattingMessageInput';
import CallDescription from '@image/chatting/CallDescription.svg?react';
import CallButton from '@image/chatting/call-button.svg?react';
import { getUserInfo } from '@/shared/api/user';
import { useParams } from 'react-router-dom';

interface MessageData {
  text: string;
  sender: 'user' | 'other';
  time: string;
  date: string;
}

const signalUri = import.meta.env.VITE_SOCKET_BASE_URL;

const ChattingPage = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [showCallButton, setShowCallButton] = useState(true);
  const navigate = useNavigate();
  let userId = 0;

  const handleUserInfo = async () => {
    try {
      const response = await getUserInfo();
      userId = response.data.id;
    } catch (error) {
      console.log(error);
    }
  };

  const iRunOnlyOnce = () => {
    handleUserInfo();
  };
  useEffect(iRunOnlyOnce, []);

  const socketRef = useRef<Socket | null>(null);

  // Socket 연결
  useEffect(() => {
    const socket = io(signalUri, {
      query: { roomId: 1 },
      withCredentials: true,
    });
    socketRef.current = socket;
    console.log('asdf');
    // 메시지 수신 처리
    socket.on('message', (data) => {
      const isUserMessage = data.senderId === userId;
      const nowTime = new Date();
      console.log(data);
      const formattedMessage: MessageData = {
        text: data.content,
        sender: isUserMessage ? 'user' : 'other',
        time: formatTime(nowTime),
        date: new Date().toLocaleDateString(),
      };

      setMessages((prevMessages) => [...prevMessages, formattedMessage]);
    });
    socket.on('pre_offer', () => {
      console.log('got pre_offer');
      navigate('/voice-call', {
        state: {
          preoffer: true,
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 메시지 전송
  const handleSendMessage = (text: string) => {
    // const newMessage: MessageData = {
    //   text,
    //   sender: 'user',
    //   time: new Date().toLocaleTimeString(),
    //   date: new Date().toLocaleDateString(),
    // };

    // 서버로 메시지 전송
    socketRef.current?.emit('message', {
      senderId: userId,
      content: text,
    });
  };

  const handleCall = ({}) => {
    console.log('handleCall');
    if (!socketRef.current) return;
    socketRef.current.emit('pre_offer', {});
    navigate('/voice-call', { state: {} });
  };

  // 전화 버튼 표시 조건 업데이트
  const mentoringStartTime = '2024-11-24T03:40:00'; // 임시 시간 데이터
  useEffect(() => {
    const updateCallButtonVisibility = () => {
      const currentTime = new Date();
      const startTime = new Date(mentoringStartTime);
      const tenMinutesBefore = new Date(startTime.getTime() - 10 * 60 * 1000); // 시작 10분 전
      const oneHourAfter = new Date(startTime.getTime() + 60 * 60 * 1000); // 시작 1시간 후

      setShowCallButton(
        currentTime >= tenMinutesBefore && currentTime <= oneHourAfter
      );
    };

    updateCallButtonVisibility();
    const intervalId = setInterval(updateCallButtonVisibility, 10000);

    return () => clearInterval(intervalId);
  }, [mentoringStartTime]);

  function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // 12시간 형식 (오전/오후)
    };

    const timeString = date.toLocaleTimeString('ko-KR', options);

    // '오전 10:00' 형식으로 반환
    return timeString.replace(/AM|PM/, (match) =>
      match === 'AM' ? '오전' : '오후'
    );
  }

  return (
    <St.ChattingPageWrapper>
      <Navigation
        userName='김성은'
        showBackButton
        label='멘토'
        onBackClick={() => console.log('뒤로가기')}
      />
      {showCallButton && (
        <St.CallBoxWrapper>
          <CallDescription />
          <CallButton onClick={handleCall} />
        </St.CallBoxWrapper>
      )}
      <St.ChattingWrapper>
        <Chatting messages={messages} />
      </St.ChattingWrapper>
      <St.MessageInputWrapper>
        <ChattingMessageInput onSendMessage={handleSendMessage} />
      </St.MessageInputWrapper>
    </St.ChattingPageWrapper>
  );
};

// Styled-components
const St = {
  ChattingPageWrapper: styled.div`
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-top: 0;
    width: 100%;
    height: 100%;
  `,
  ChattingWrapper: styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;
    padding-bottom: 96px;
    -webkit-overflow-scrolling: touch;
  `,
  MessageInputWrapper: styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 96px;
    max-width: var(--app-max-width);
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.5);
  `,
  CallBoxWrapper: styled.div`
    position: fixed;
    display: flex;
    margin: 122px 20px 0px 20px;
  `,
  CallButton: styled.button`
    cursor: pointer;
  `,
};

export default ChattingPage;

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import io, { Socket } from 'socket.io-client';

import Navigation from '@page/component/navi/Navigation';
import Chatting from './component/Chatting';
import ChattingMessageInput from './component/ChattingMessageInput';
import CallDescription from '@image/chatting/CallDescription.svg?react';
import CallButton from '@image/chatting/call-button.svg?react';
import { getChattingMessage } from '@/shared/api/chatting';

interface MessageData {
  text: string;
  sender: 'user' | 'other';
  time: string;
  date: string;
}

const ChattingPage = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [showCallButton, setShowCallButton] = useState(true);

  const socketRef = useRef<Socket | null>(null);

  const previousMessages = getChattingMessage({ id: '1' });
  console.log(previousMessages);

  // Socket 연결
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SOCKET_BASE_URL}`, {
      query: { roomId: 1 },
      withCredentials: true,
    });
    socketRef.current = socket;

    // 메시지 수신 처리
    socket.on('message', (data: { senderId: string; content: string }) => {
      const isUserMessage = data.senderId === 'user_id'; // 사용자의 ID와 비교
      const formattedMessage: MessageData = {
        text: data.content,
        sender: isUserMessage ? 'user' : 'other',
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };

      setMessages((prevMessages) => [...prevMessages, formattedMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 메시지 전송
  const handleSendMessage = (text: string) => {
    const newMessage: MessageData = {
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // 서버로 메시지 전송
    socketRef.current?.emit('message', {
      senderId: 'user_id', // 실제 사용자의 ID로 대체
      content: text,
    });
  };

  // 전화 버튼 표시 조건 업데이트
  const mentoringStartTime = '2024-11-23T17:41:00'; // 임시 시간 데이터
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
          <CallButton onClick={() => console.log('handleCall')} />
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
};

export default ChattingPage;

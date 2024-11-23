import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navigation from '@page/component/navi/Navigation';
import Chatting from './component/Chatting';
import ChattingMessageInput from './component/ChattingMessageInput';
import CallDescription from '@image/chatting/CallDescription.svg?react';
import CallButton from '@image/chatting/call-button.svg?react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

interface MessageData {
  text: string;
  sender: 'user' | 'other';
  time: string;
  date: string;
}

const signalUri = import.meta.env.VITE_SOCKET_BASE_URL;

const ChattingPage = () => {
  const [messages, setMessages] = React.useState<MessageData[]>([]);
  const [showCallButton, setShowCallButton] = useState(true);

  const mentoringStartTime = '2024-11-23T20:41:00'; // 임시 시간 데이터
  const socketRef = useRef<Socket>(); // socket 연결
  const navigate = useNavigate();
  

  useEffect(() => {
    // WebSocket 연결
    const socket = io(signalUri, {
      query: {roomId: 1 },
      withCredentials: true,
    })

    console.log(socketRef.current);
    socketRef.current = socket;
    console.log("socket: ", socketRef.current);

    socket.on("preoffer", () => {
      console.log("got preoffer");
      navigate("/voice-call", {state: "preoffer"})
    });
  }, [])
  

  useEffect(() => {
    const updateCallButtonVisibility = () => {
      const currentTime = new Date();
      const startTime = new Date(mentoringStartTime);
      const tenMinutesBefore = new Date(startTime.getTime() - 10 * 60 * 1000); // 시작 10분 전
      const oneHourAfter = new Date(startTime.getTime() + 60 * 60 * 1000); // 시작 1시간 후

      if (currentTime >= tenMinutesBefore && currentTime <= oneHourAfter) {
        setShowCallButton(true);
      } else {
        setShowCallButton(false);
      }
    };

    updateCallButtonVisibility();
    const intervalId = setInterval(updateCallButtonVisibility, 10000);

    return () => clearInterval(intervalId);
  }, [mentoringStartTime]);

  const handleCall = () => {
    console.log('handleCall');
    socketRef.current?.emit("preoffer");
    navigate("/voice-call");
  };

  const handleSendMessage = (text: string) => {
    setMessages([
      ...messages,
      {
        text,
        sender: 'user',
        time: '오전 9:59',
        date: '2024-11-20',
      },
    ]);

    // 답장 예시
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: '나도 몰라몰라 나도 몰라',
          sender: 'other',
          time: '오전 11:45',
          date: '2024-11-20',
        },
      ]);
    }, 1000);
  };

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
          <CallButton onClick={() => handleCall()} />
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
    overflow-y: auto;
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

  CallDescription: styled.div`
    padding-left: 20px;
  `,

  CallButton: styled.button`
    margin-right: 0px;
    svg {
      cursor: pointer;
    }
  `,
};

export default ChattingPage;

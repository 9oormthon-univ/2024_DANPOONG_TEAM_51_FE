import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import Navigation from '@page/component/navi/Navigation';
import Chatting from './component/Chatting';
import ChattingMessageInput from './component/ChattingMessageInput';
import CallDescription from '@image/chatting/CallDescription.svg?react';
import CallButton from '@image/chatting/call-button.svg?react';

interface MessageData {
  text: string;
  sender: 'user' | 'other';
  time: string;
  date: string;
}

const ChattingPage = () => {
  const [messages, setMessages] = React.useState<MessageData[]>([]);
  const [showCallButton, setShowCallButton] = useState(true);

  const handleCall = () => {
    console.log('handleCall');
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

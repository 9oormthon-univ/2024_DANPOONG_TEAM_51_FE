import { useState } from 'react';
import styled from 'styled-components';

import AlbumButton from '@image/chatting/imageIcon.svg?react';
import FileButton from '@image/chatting/fileIcon.svg?react';
import CalendarButton from '@image/chatting/calendarIcon.svg?react';
import SendButton from '@image/chatting/sendButton.svg?react';

interface ChattingMessageInputProps {
  onSendMessage: (message: string) => void;
}

const ChattingMessageInput = ({ onSendMessage }: ChattingMessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <St.InputWrapper>
      <St.ButtonBoxWrapper>
        <AlbumButton />
        <FileButton />
        <CalendarButton />
      </St.ButtonBoxWrapper>
      <St.Input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 입력하세요'
      />
      <SendButton onClick={handleSend} />
    </St.InputWrapper>
  );
};

const St = {
  InputWrapper: styled.div`
    display: flex;
    padding: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  `,

  ButtonBoxWrapper: styled.div`
    display: flex;
    width: 90px;
    height: 40px;
    padding-right: 8px;
    justify-content: space-between;
    align-items: center;
  `,

  ButtonIcon: styled.button`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,

  Input: styled.input`
    flex: 1;
    height: 36px;

    padding: 8px 16px 8px 16px;
    border-radius: 16px;
    border: none;
    ${({ theme }) => theme.fonts.body_medium};
    margin-top: 4px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.colors.white};
    outline: none;
  `,

  SendButtonWrapper: styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  `,
};

export default ChattingMessageInput;

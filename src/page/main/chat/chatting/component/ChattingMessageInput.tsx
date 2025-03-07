import { useState } from 'react';
import styled from 'styled-components';

import AlbumButton from '@image/chatting/imageIcon.svg?react';
import FileButton from '@image/chatting/fileIcon.svg?react';
import CalendarButton from '@image/chatting/calendarIcon.svg?react';
import SendButton from '@image/chatting/sendButton.svg?react';
import ActivationSendButton from '@image/chatting/activationSendButton.svg?react';
import { useNavigate } from 'react-router-dom';

interface ChattingMessageInputProps {
  onSendMessage: (message: string) => void;
}

const ChattingMessageInput = ({ onSendMessage }: ChattingMessageInputProps) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleMessageSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleBookMentoring = () => {
    navigate("/chatting/book");
  }

  return (
    <St.InputWrapper>
      <St.ButtonBoxWrapper>
        <AlbumButton />
        <FileButton />
        <CalendarButton onClick={handleBookMentoring} />
      </St.ButtonBoxWrapper>
      <St.Input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 입력하세요'
      />
      {/* 텍스트 유무에 따라 버튼 이미지를 변경 */}
      {message.trim() ? (
        <St.SendButtonWrapper onClick={handleMessageSend}>
          <ActivationSendButton />
        </St.SendButtonWrapper>
      ) : (
        <St.SendButtonWrapper>
          <SendButton />
        </St.SendButtonWrapper>
      )}
    </St.InputWrapper>
  );
};

const St = {
  InputWrapper: styled.div`
    display: flex;
    padding: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
    align-items: center;
  `,

  ButtonBoxWrapper: styled.div`
    display: flex;
    width: 90px;
    height: 40px;
    padding-right: 8px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
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
    background: none;
    padding: 0;
  `,
};

export default ChattingMessageInput;

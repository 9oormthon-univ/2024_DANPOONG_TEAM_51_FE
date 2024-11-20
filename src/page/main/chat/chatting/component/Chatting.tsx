import styled from 'styled-components';
import profileImage from '@image/chatting/userProfile.svg';

interface MessageData {
  text: string;
  sender: 'user' | 'other';
  time: string;
  date: string;
}

interface ChattingProps {
  messages: MessageData[];
}

// 임시 멘토 프로필
const OtherUserProfile = {
  name: '권정',
  profileImg: `url(${profileImage})`,
};

const Chatting = ({ messages }: ChattingProps) => {
  const renderMessages = () => {
    let lastDate = '';

    return messages.map((message, index) => {
      const showDateLabel = message.date !== lastDate;
      lastDate = message.date;

      return (
        <div key={index}>
          {showDateLabel && <DateLabel>{formatDate(message.date)}</DateLabel>}
          <MessageContainer $isUser={message.sender === 'user'}>
            <MessageWrapper $isUser={message.sender === 'user'}>
              {message.text}
            </MessageWrapper>
            <TimeLabel $isUser={message.sender === 'user'}>
              {message.time}
            </TimeLabel>
          </MessageContainer>
        </div>
      );
    });
  };

  return <ListWrapper>{renderMessages()}</ListWrapper>;
};

// 날짜 형식 변환 함수
const formatDate = (date: string) => {
  const today = new Date().toISOString().split('T')[0];
  const dayOfWeek = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const dateObj = new Date(date);
  if (date === today) return '오늘';

  return `${dateObj.getFullYear()}년 ${
    dateObj.getMonth() + 1
  }월 ${dateObj.getDate()}일 ${dayOfWeek[dateObj.getDay()]}`;
};

const ListWrapper = styled.div`
  width: 393px;
  padding: 0px 16px 16px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const DateLabel = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 16px auto;
  color: ${({ theme }) => theme.colors.gray500};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 4px 8px;
  ${({ theme }) => theme.fonts.body_small};
  max-width: fit-content;
`;

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: ${({ $isUser }) => ($isUser ? 'row-reverse' : 'row')};
  align-items: center;
  margin-bottom: 12px;
`;

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  background: ${({ theme, $isUser }) =>
    $isUser ? theme.colors.orange40 : theme.colors.white};
  color: ${({ theme, $isUser }) =>
    $isUser ? theme.colors.white : theme.colors.gray700};
  ${({ theme }) => theme.fonts.chatting_medium};
  padding: 8px 12px;
  max-width: 70%;
  word-break: break-word;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top-right-radius: ${({ $isUser }) => ($isUser ? '0px' : '16px')};
  border-top-left-radius: ${({ $isUser }) => ($isUser ? '16px' : '0px')};
`;

const TimeLabel = styled.div<{ $isUser: boolean }>`
  ${({ theme }) => theme.fonts.body_small};
  color: ${({ theme }) => theme.colors.gray400};
  margin: ${({ $isUser }) => ($isUser ? '0 8px 0 0' : '0 0 0 8px')};
  align-self: flex-end;
`;

export default Chatting;

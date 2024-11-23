import styled from 'styled-components';
import Profile from './Profile';

interface ProfileCardMentoProps {
  name: string;
  keyword: string;
  profileSrc?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void; // 타입 수정
}
interface ProfileCardMenteeProps extends ProfileCardMentoProps {
  mentoringTitle: string;
}
export const ProfileCardMento = (props: ProfileCardMentoProps) => {
  return (
    <div onClick={props.onClick}>
      <St.ProfileCard>
        <div>
          <St.Name>{props.name}</St.Name>
          <St.Keyword>{props.keyword}</St.Keyword>
        </div>
        <Profile size='lg' src={props.profileSrc} />
      </St.ProfileCard>
    </div>
  );
};
export const ProfileCardMentee = (props: ProfileCardMenteeProps) => {
  return (
    <div onClick={props.onClick}>
      <St.ProfileCard>
        <div>
          <St.Title>{props.mentoringTitle}</St.Title>
          <div>
            <St.Name>{props.name}</St.Name>
            <St.Keyword>{props.keyword}</St.Keyword>
          </div>
        </div>
        <Profile size='lg' src={props.profileSrc} />
      </St.ProfileCard>
    </div>
  );
};

const St = {
  ProfileCard: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.6rem 2rem;
    border-radius: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    background-color: white;
    color: ${({ theme }) => theme.colors.gray700};
    cursor: pointer;
  `,
  Name: styled.span`
    ${({ theme }) => theme.fonts.title_medium};
    margin-right: 8px;
  `,
  Keyword: styled.span`
    ${({ theme }) => theme.fonts.body_medium};
  `,
  Title: styled.div`
    display: inline-block;
    margin-bottom: 8px;
    padding: 0.8rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.colors.orange95};
    color: ${({ theme }) => theme.colors.gray800};

    ${({ theme }) => theme.fonts.title_medium};
  `,
};

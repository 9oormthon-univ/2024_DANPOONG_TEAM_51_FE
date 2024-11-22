import styled from "styled-components"
import Profile from "./Profile";

interface ProfileCardMentoProps {
  name: string;
  keyword: string;
  profileSrc?: string;
}
interface ProfileCardMenteeProps extends ProfileCardMentoProps {
  mentoringTitle: string;
}
export const ProfileCardMento = (props:ProfileCardMentoProps) => {
  return (
    <St.ProfileCard>
      <div>
        <St.Name>{props.name}</St.Name>
        <St.Keyword>{props.keyword}</St.Keyword>
      </div>
      <Profile size="lg" src={props.profileSrc}/>
    </St.ProfileCard>
  );
}
export const ProfileCardMentee = (props:ProfileCardMenteeProps) => {
  return (
    <St.ProfileCard>
      <div>
        <St.Title>{props.mentoringTitle}</St.Title>
        <div>
          <St.Name>{props.name}</St.Name>
          <St.Keyword>{props.keyword}</St.Keyword>
        </div>
      </div>
      <Profile size="lg" src={props.profileSrc}/>
    </St.ProfileCard>
  );
}

const St = {
  ProfileCard: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.6rem 2rem;
    border-radius: 1.6rem;
    border: 1px solid ${({theme}) => theme.colors.gray200};
    background-color: white;
    color: ${({theme}) => theme.colors.gray700};
  `,
  Name: styled.span`
    ${({theme})=>theme.fonts.title_medium};
    margin-right: 8px;
  `,
  Keyword: styled.span`
    ${({theme})=>theme.fonts.body_medium};
  `,
  Title: styled.div`
    display: inline-block;
    margin-bottom: 8px;
    padding: 0.8rem;
    border-radius: 0.8rem;
    background-color: ${({theme}) => theme.colors.orange95};
    color: ${({theme}) => theme.colors.gray800};

    ${({theme})=>theme.fonts.title_medium};
  `
  
}
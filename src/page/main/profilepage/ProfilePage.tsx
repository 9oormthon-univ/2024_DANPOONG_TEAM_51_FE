import Button from "@/page/component/button/Button";
import Navigation from "@/page/component/navi/Navigation";
import Notification from "@/page/component/Notification";
import Profile from "@/page/component/Profile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfilePage = () => {
  const [isMentor, setIsMentor] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }
  const handleSubmit = () => {
    setIsSubmitted(true);
  }
  const handleNext = () => {
    navigate('/mypage');
  }

  return(
    <St.Wrapper>
      {!isSubmitted? <>
        <St.Background $isMentor={isMentor}/>
        <Navigation
          title={`${isMentor?'멘토':'멘티'} 프로필`}
          showBackButton
          onBackClick={handleBack}
        />
        <St.ContentWrapper>
          <St.ProfileWrapper>
            <St.Tooltip>
              {isMentor? '멘토 심사에 승인될 경우 뱃지를 지급해드려요':'제목'}
            </St.Tooltip>
            <Profile size="2xl"/>
            <St.UserNameWrapper>
              <St.UserName>사용자 이름</St.UserName>
              키워드
            </St.UserNameWrapper>
            <St.InfoWrapper>
              <Info label={isMentor?"멘토 이력":"멘티 고민사항"} desc="description"/>
              <Info label={isMentor?"멘토 설명":"원하는 멘토"} desc="description"/>
            </St.InfoWrapper>
          </St.ProfileWrapper>
          {isMentor?
            <Button onClick={handleSubmit}>멘토링 신청하기</Button>
            :
            <St.ButtonGroup>
              <Button 
                variant="secondary"
                onClick={handleBack}
              >거절하기</Button>
              <Button onClick={handleSubmit}>수락하기</Button>
            </St.ButtonGroup>          
          }
        </St.ContentWrapper>
      </>:
      <St.ContentWrapper>
        <St.Dummy/>
          {isMentor? 
            <St.Heading>
              신청이 완료되었습니다.
            </St.Heading>
          :
            <St.HeadingWrapper>
              <St.Heading>
                멘토링이 수락되었습니다.
              </St.Heading>
              <Notification>자세한 내용은 나중에 채팅으로 함께 정해보세요</Notification>
            </St.HeadingWrapper>
          }
        <Button onClick={handleNext}>마이페이지로 돌아가기</Button>
      </St.ContentWrapper>
      }
    </St.Wrapper>
  );
}

export default ProfilePage;

const Info = ({label, desc}:{label:string; desc:string}) => {
  return (
    <St.FieldWrapper>
      <St.Label>{label}</St.Label>
      <St.Field>{desc}</St.Field>
    </St.FieldWrapper>
  );
}



const St = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    `,
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: ${ ({theme}) => theme.colors.gray700};    
    padding: 2.4rem 2rem 5.6rem 2rem;
    margin: 0 auto;
    max-width: 360px;
    height: 100%;
    width: 100%;
    color: ${({theme}) => theme.colors.gray700};
  `,
  Background: styled.div<{$isMentor?:boolean}>`
    position: absolute;
    z-index: -1;
    width: 100%;
    height:246px;
    background: radial-gradient(at 50% 100%, ${props => {
      return props.$isMentor? `#FFE5F8, #F8DAA4` :
        `#F8DAA4,#FFE5F8`
    }});
  `,
  ProfileWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
    width: 100%;

    margin-top: 170px;
  `,
  Tooltip: styled.div`
    ${({theme}) => theme.fonts.body_medium}
    position: absolute;
    transform: translateY(-5rem);
    background-color: ${({theme}) => theme.colors.orange95};
    border-radius: 0.9rem;
    padding: 0.4rem 0.8rem;
  `,
  UserNameWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    ${({theme}) => theme.fonts.body_large}
  `,
  UserName: styled.div`
    ${({theme}) => theme.fonts.title_large}
  `,
  Heading: styled.h1`
    ${({ theme }) => theme.fonts.title_extralarge}
    text-align: center;
    word-break: keep-all;
  `,
  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    margin-top: 1.6rem;
  `,
  FieldWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
  Label: styled.div`
    ${({theme}) => theme.fonts.title_medium}
  `,
  Field: styled.div`
    padding: 1.6rem;
    border-radius: 0.8rem;
    ${({theme}) => theme.fonts.body_large}
    background-color: white;
  `,
  ButtonGroup: styled.div`
    display:flex;
    justify-content: space-between;
    width: 100%;
    gap: 0.8rem;
  `,
  Dummy: styled.div`
    visibility: hidden;
  `,
  HeadingWrapper: styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`,
}
import styled from 'styled-components';
import Button from './button/Button';
import ButtonSmall from './button/ButtonSmall';
import Badge from './Badge';
import ButtonBig from './button/ButtonBig';
import Profile from './Profile';
import IconExample from '@image/tabBar/chat.svg?react'
import { ProfileCardMentee, ProfileCardMento } from './ProfileCard';

const Index = () => {
  return (
    <St.BtnTestWrapper>
      <St.HomeTitle>테스트</St.HomeTitle>
      <ButtonSmall >프로필 보기</ButtonSmall>
      <St.BadgeSet>
        <Badge variant='badge-orange'>멘토</Badge>
        <Badge variant="badge-pink">멘티</Badge>
        <Badge>텍스트</Badge>
        
        <Profile />
        <Profile src='https://avatars.githubusercontent.com/u/80196807?s=80&v=4'/>
        <Profile size='lg'/>
        <Profile size='2xl'/>
        <Profile size='xl'/>
      </St.BadgeSet>
      <ProfileCardMento 
        name='이름' keyword='키워드' profileSrc='https://avatars.githubusercontent.com/u/80196807?s=80&v=4'/>
      <ProfileCardMentee 
        name='이름' keyword='키워드' mentoringTitle='제목'/>
      <ButtonBig leftIcon={IconExample} subtitle='예시 설명'>Title</ButtonBig>
      <ButtonBig variant="secondary" leftIcon={IconExample} subtitle='예시 설명'>Title</ButtonBig>
      <ButtonBig rightIcon={false} disabled>예정된 멘토링이 없어요</ButtonBig>
      <ButtonBig >Title</ButtonBig>
      <ButtonBig subtitle='예시 설명'>Title</ButtonBig>
      <Button >확인</Button>
      <Button rightIcon >확인</Button>
      <Button rightIcon selected >확인</Button>
      <Button rightIcon disabled >확인</Button>
      <Button variant='secondary'>확인</Button>
      <Button variant='secondary' rightIcon >확인</Button>
      <Button variant='secondary' rightIcon selected >확인</Button>
      <Button variant='secondary' rightIcon disabled >확인</Button>
      <Button variant='text'>확인</Button>
      <Button variant='text' rightIcon >확인</Button>
      <Button variant='text' rightIcon selected >확인</Button>
      <Button variant='text' rightIcon disabled >확인</Button>
    </St.BtnTestWrapper>
  );
};

export default Index;

const St = {
  BtnTestWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    padding: 5rem 2rem;
  `,
  HomeTitle: styled.h1`
    ${({ theme }) => theme.fonts.display_medium};
  `,
  BadgeSet: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  `
};
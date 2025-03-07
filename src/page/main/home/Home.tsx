import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navigation from '@/page/component/navi/Navigation';
import bannerMentorImg from '@image/home/banner_mentor.png';
import bannerMenteeImg from '@image/home/banner_mentee.png';
import mentoringProcessImg from '@image/home/mentoring-explain.png';
import UserProfile from '@/page/main/home/component/UserProfile';
import { getMentors } from '@/shared/api/home';
import { getUserInfo } from '@/shared/api/user';

interface UserList {
  name: string;
  keyword: string;
}

const Home = () => {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [isMentor, setIsMentor] = useState<boolean>(true);
  const [profileText, setProfileText] = useState<string>(
    '멘토링 신청을 할 수 있는 멘토들이에요'
  );

  const handleHome = async () => {
    try {
      const response = await getMentors();
      const user = response.data.map((mentor) => ({
        name: mentor.name,
        keyword: (mentor.keyword || []).join(', '),
      }));
      setUserList(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setIsMentor(response.data.role === 'MENTOR');
      if (isMentor == true) {
        setProfileText('멘토링 신청을 할 수 있는 멘토들이에요');
      } else {
        setProfileText('멘토링은 어떻게 진행되나요?');
      }
      console.log(isMentor);
    } catch (error) {
      console.log(error);
    }
  };

  const iRunOnlyOnce = () => {
    handleHome();
    handleUserInfo();
  };
  useEffect(iRunOnlyOnce, []);

  return (
    <>
      <St.HomeWrapper>
        <Navigation showLogo={true} />
        <St.BannerWrapper>
          {isMentor ? (
            <img src={bannerMentorImg} alt='profile' />
          ) : (
            <img src={bannerMenteeImg} alt='profile' />
          )}
        </St.BannerWrapper>

        <St.ProfileText>{profileText}</St.ProfileText>
        <St.ProfileListWrapper>
          {userList.map((data) => (
            <UserProfile name={data.name} keyword={data.keyword} />
          ))}
        </St.ProfileListWrapper>
        <St.MentoringProcessText>
          {'멘토링은 어떻게 진행되나요?'}
        </St.MentoringProcessText>
        <St.MentoringProcessWrapper>
          <img src={mentoringProcessImg} alt='mentoringProcess' />
        </St.MentoringProcessWrapper>
        <St.MentoringProcessDescription>
          {`ㆍ멘토 심사가 승인된 멘토만 멘토링을 진행할 수 있어요.
ㆍ멘티는 배우고 싶은 소프트 스킬을 가진 멘토에게 멘토링을 요청할 수 있어요.
ㆍ멘토는 멘티의 프로필을 보고 멘티의 멘토링을 수락하거나 거절할 수 있어요.
ㆍ멘토링 후 요약본이 도착하는 시간은 멘토링 진행 시간에 따라 달라지며,
   일반적으로는 약 4시간 정도 걸려요.`}
        </St.MentoringProcessDescription>
      </St.HomeWrapper>
    </>
  );
};

const St = {
  HomeWrapper: styled.div`
    flex-grow: 1;
    display: flex;
    width: 393px;
    display: flex;
    flex-direction: column;
  `,

  BannerWrapper: styled.div`
    display: flex;
    width: 393px;
    height: 128px;
    margin-top: 108px;
    img {
      width: 100%;
    }
  `,

  ProfileText: styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.title_medium};
    color: ${({ theme }) => theme.colors.gray700};
    margin: 24px 20px;
  `,

  ProfileListWrapper: styled.div`
    display: flex;
    margin: 0px 12px;
    overflow-x: auto; /* 가로 스크롤 활성화 */
    overflow-y: hidden; /* 세로 스크롤 제거 */
    white-space: nowrap; /* 줄바꿈 방지 */
  `,

  MentoringProcessText: styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.title_medium};
    color: ${({ theme }) => theme.colors.gray700};
    margin: 32px 20px 0px 20px;
  `,

  MentoringProcessWrapper: styled.div`
    display: flex;
    width: 353px;
    height: 88;
    margin: 16px 20px 0px 20px;
    justify-content: center;
    img {
      width: 100%;
    }
  `,

  MentoringProcessDescription: styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.gray500};
    margin: 16px 20px;
    white-space: break-spaces;
  `,
};

export default Home;

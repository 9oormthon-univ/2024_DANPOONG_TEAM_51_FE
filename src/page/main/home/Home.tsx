import styled from 'styled-components';

import Navigation from '@/page/component/navi/Navigation';
import bannerImg from '@image/home/banner_mentor.png';
import mentoringProcessImg from '@image/home/mentoring-explain.png';

const Home = () => {
  return (
    <>
      <St.HomeWrapper>
        <Navigation showLogo={true} />
        <St.BannerWrapper>
          <img src={bannerImg} alt='profile' />
        </St.BannerWrapper>
        <St.ProfileText>
          {'멘토링 신청을 할 수 있는 멘토들이에요'}
        </St.ProfileText>
        <St.ProfileListWrapper></St.ProfileListWrapper>
        <St.MentoringProcessText>
          {'멘토링은 어떻게 진행되나요?'}
        </St.MentoringProcessText>
        <St.MentoringProcessWrapper>
          <img src={mentoringProcessImg} alt='mentoringProcess' />
        </St.MentoringProcessWrapper>
        <St.MentoringProcessDescription>
          {'안녕하세요 안녕 안녕...'}
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
    width: 100%;
    max-width: 393px;
    display: flex;
    // width: 393px;
    height: 128px;
    margin-top: 108px;
  `,

  ProfileText: styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.title_medium};
    color: ${({ theme }) => theme.colors.gray700};
    margin: 24px 20px;
  `,

  ProfileListWrapper: styled.div`
    display: flex;
  `,

  MentoringProcessText: styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.title_medium};
    color: ${({ theme }) => theme.colors.gray700};
    margin: 32px 20px;
  `,

  MentoringProcessWrapper: styled.div`
    display: flex;
    width: 353px;
    height: 88;
    margin: 16px 20px 0px 20px;
    justify-content: center;
  `,

  MentoringProcessDescription: styled.div`
    display: flex;
    ${({ theme }) => theme.fonts.title_medium};
    color: ${({ theme }) => theme.colors.gray500};
    margin: 16px 20px;
  `,
};

export default Home;

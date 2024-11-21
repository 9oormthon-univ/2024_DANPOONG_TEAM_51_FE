import styled from 'styled-components';

import BackButtonIcon from '@image/component/chevron-left.svg?react';
import LogoIcon from '@image/component/cone_logo.svg?react';

interface NavigationProps {
  title?: string;
  showBackButton?: boolean;
  userName?: string;
  label?: '멘토' | '멘티';
  showLogo?: boolean;
  onBackClick?: () => void;
  isOnlyTitle?: boolean;
}

const Navigation = ({
  title,
  showBackButton = false,
  userName,
  label,
  showLogo = false,
  onBackClick,
  isOnlyTitle = false,
}: NavigationProps) => {
  return (
    <St.NavigationWrapper>
      <St.NavigationBox>
        {/* 뒤로가기 버튼 */}
        {showBackButton && (
          <St.BackButton onClick={onBackClick}>
            <BackButtonIcon />
          </St.BackButton>
        )}

        {/* 로고 */}
        {showLogo && (
          <St.LogoWrapper>
            <LogoIcon />
          </St.LogoWrapper>
        )}

        {/* 타이틀 */}
        {title && (
          <St.TitleText $isOnlyTitle={isOnlyTitle}>{title}</St.TitleText>
        )}

        {/* 라벨 */}
        {userName && (
          <St.UserInfoBox>
            <St.UserNameText>{userName}</St.UserNameText>
            <St.UserLabel>{label === '멘토' ? '멘토' : '멘티'}</St.UserLabel>
          </St.UserInfoBox>
        )}
        <St.EmptyBox />
      </St.NavigationBox>
    </St.NavigationWrapper>
  );
};

const St = {
  NavigationWrapper: styled.div`
    width: 100%;
    height: 108px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    background-color: rgba(255, 255, 255, 0.5);
  `,

  NavigationBox: styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 48px;
  `,

  BackButton: styled.button`
    cursor: pointer;
    background: none;
    border: none;
    margin: 20px 4px 16px 20px;

    svg {
      width: 28px;
      height: 28px;
    }
  `,

  TitleText: styled.div<{ $isOnlyTitle: boolean }>`
    color: ${({ theme }) => theme.colors.gray700};
    ${({ theme }) => theme.fonts.title_large};
    flex-grow: 1;
    margin-left: ${({ $isOnlyTitle }) => ($isOnlyTitle ? '20px' : '0px')};
  `,

  UserInfoBox: styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    gap: 8px;
  `,

  UserNameText: styled.div`
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.fonts.title_large};
    flex-grow: 1;
    padding-top: 2px;
  `,

  UserLabel: styled.div`
    width: 43px;
    height: 30px;
    background-color: ${({ theme }) => theme.colors.orange95};
    color: ${({ theme }) => theme.colors.gray500};
    border-radius: 36px;
    border: 1px solid ${({ theme }) => theme.colors.orange80};
    padding: 8px;
    ${({ theme }) => theme.fonts.title_small};
  `,

  LogoWrapper: styled.div`
    flex-grow: 1;
    margin-left: 20px;
  `,

  EmptyBox: styled.div`
    width: 28px;
    height: 28px;
    margin: 20px 4px 16px 20px;
  `,
};

export default Navigation;

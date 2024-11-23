import styled from 'styled-components';

import CheckIcon from '@image/home/check_icon.svg?react';
import UserImg from '@image/home/user_default_img.svg?react';

interface UserListProps {
  name: string;
  keyword: string;
}

const UserProfile = ({ name, keyword }: UserListProps) => {
  console.log(name, keyword);
  return (
    <>
      <St.UserProfileWrapper>
        <St.CheckIcon>
          <CheckIcon />
        </St.CheckIcon>
        <St.UserIcon>
          <UserImg />
        </St.UserIcon>
        <St.UserNameText>{name}</St.UserNameText>
        <St.UserKeywordText>{keyword}</St.UserKeywordText>
      </St.UserProfileWrapper>
    </>
  );
};

const St = {
  UserProfileWrapper: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 128px;
    height: 160px;
    margin: 0px 4px;
  `,

  CheckIcon: styled.div`
    margin-top: 15px;
  `,

  UserIcon: styled.div`
    margin-top: 4px;
  `,

  UserNameText: styled.div`
    ${({ theme }) => theme.fonts.title_medium};
    color: ${({ theme }) => theme.colors.gray700};
    margin-top: 4px;
  `,

  UserKeywordText: styled.div`
    ${({ theme }) => theme.fonts.body_medium};
    color: ${({ theme }) => theme.colors.gray700};
  `,
};

export default UserProfile;

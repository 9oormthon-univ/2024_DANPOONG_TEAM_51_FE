import styled from 'styled-components';

import MentoringStartIcon from '@image/chatting/mentoringStartIcon.svg?react';

const MentoringStart = () => {
  return (
    <St.MentoringStartWrapper>
      <MentoringStartIcon />
      <St.MentoringStartTextBox>
        <St.MentoringStartText>멘토링이 확정되었어요</St.MentoringStartText>
        <St.MentoringStartDescriptionText>
          상대와 함께 자세한 내용을 정해보세요
        </St.MentoringStartDescriptionText>
      </St.MentoringStartTextBox>
    </St.MentoringStartWrapper>
  );
};

const St = {
  MentoringStartWrapper: styled.div`
    background-color: ${({ theme }) => theme.colors.orange95};
    color: ${({ theme }) => theme.colors.gray500};
    border-radius: 16px;
    border: none;
    padding: 18px 16px;
    margin: 128px 20px 0px 20px;
    display: flex;
    align-items: center;
    height: 66px;
  `,

  MentoringStartTextBox: styled.div`
    display: inline-block;
    margin-left: 8px;
  `,

  MentoringStartText: styled.div`
    ${({ theme }) => theme.fonts.title_small};
    margin-bottom: 4px;
  `,

  MentoringStartDescriptionText: styled.div`
    ${({ theme }) => theme.fonts.body_small};
  `,
};

export default MentoringStart;

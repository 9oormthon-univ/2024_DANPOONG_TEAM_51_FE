import styled from "styled-components";

export const VoiceCallStyle = {
  Wrapper: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-content: space-between;
      
      height: 100%;
      margin: 0 auto;
      padding: 15vh 2rem 5.6rem 2rem;
    `,
  Heading: styled.h1`
      ${({ theme }) => theme.fonts.title_extralarge}
      color: ${props => props.theme.colors.gray700};
      text-align: center;
    `,
}
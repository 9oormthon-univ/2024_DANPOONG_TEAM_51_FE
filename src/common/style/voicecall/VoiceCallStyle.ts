import styled from "styled-components";

export const VoiceCallStyle = {
  Wrapper: styled.div<{$profileSrc?:string;}>`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-content: space-between;
      
      height: 100%;
      margin: 0 auto;
      padding: 15vh 2rem 5.6rem 2rem;
      
      color: white;
      ${(props) => props.$profileSrc && `
        background: no-repeat center/cover url("${props.$profileSrc}");
        `}
    `,
  Heading: styled.h1`
      ${({ theme }) => theme.fonts.title_extralarge}
      text-align: center;
    `,
}
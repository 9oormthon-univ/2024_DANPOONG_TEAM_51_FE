import styled from "styled-components";

export const IndexStyle = {
  Wrapper: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      justify-content: space-between;
      
      height: 100%;
      max-width: 360px;
      margin: 0 auto;
      padding: 0 2rem;
    `,
  Heading: styled.h1`
      ${({ theme }) => theme.fonts.title_extralarge}
      color: ${props => props.theme.colors.gray700};
    `,
  Dummy: styled.div`
      visibility: hidden;
    `,
}
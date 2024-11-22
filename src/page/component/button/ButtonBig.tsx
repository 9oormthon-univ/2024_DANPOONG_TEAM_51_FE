import styled from "styled-components";
import Button from "./Button";
import { ComponentProps } from "react";

export interface ButtonBigProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  rightIcon?: boolean;
  leftIcon?: React.FunctionComponent<React.ComponentProps<"svg">>;
  selected?: boolean;
  subtitle?: string;
  children: React.ReactNode;
}

const ButtonBig = ({
  variant = "primary",
  rightIcon = true,
  ...props
}: ButtonBigProps) => {
  return(
    <St.ButtonBig rightIcon={rightIcon} $variant={variant} disabled={props.disabled}>
      <St.LeftWrapper>
        {props.leftIcon && <props.leftIcon/>}
        <St.Titles>
          {props.children}
          {props.subtitle &&
            <St.Subtitle>{props.subtitle}</St.Subtitle>
          }
        </St.Titles>
      </St.LeftWrapper>
    </St.ButtonBig>
  )
}

export default ButtonBig;

const St = {
  ButtonBig: styled(Button)<{
    $variant: ButtonBigProps["variant"];
    }>`
    padding: 2.4rem;
    border-radius: 1.6rem;
    
    color: ${({theme}) => theme.colors.gray700};
    border: 1px solid ${({theme}) => theme.colors.orange70};
    path { /* Right Icon Color */
                    stroke: ${({theme}) => theme.colors.gray600};
                  }
    
    /* variant별 색상 */
    ${(props) => {
      switch (props.$variant) {
        case "primary":
          return`
            background: ${props.theme.gradients.pinktoyellow};
          `
        case "secondary":
          return`
            background: transparent;
          `
      }
    }}

    &:disabled {
      background: #361E0033;
      border: none;
    }

  `,
  LeftWrapper: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    & svg {
      height: 3.6rem;
      width: 3.6rem;
      path { /* Left Icon Color */
        stroke: ${({theme}) => theme.colors.orange70};
      }
    }
  `,
  Titles: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  `,
  Subtitle: styled.div`
    ${ ({theme}) => theme.fonts.title_small}
    color: ${ ({theme}) => theme.colors.gray600};
  `,
}
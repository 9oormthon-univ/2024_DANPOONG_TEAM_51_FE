import styled from "styled-components";
import Button from "./Button";
import { ComponentProps } from "react";

export interface ButtonBigProps extends ComponentProps<"button"> {
  variant?: "default" | "special" | "storke";
  rightIcon?: boolean;
  leftIcon?: React.FunctionComponent<React.ComponentProps<"svg">>;
  selected?: boolean;
  subtitle?: string;
  children: React.ReactNode;
}

const ButtonBig = ({
  variant = "default",
  rightIcon = false, 
  selected = false,
  ...props
}: ButtonBigProps) => {
  return(
    <St.ButtonBig rightIcon>
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
  ButtonBig: styled(Button)`
    padding: 2.4rem;
    border-radius: 1.6rem;
    path { /* 아이콘 색상 */
                    stroke: ${({theme}) => theme.colors.orange95};
                  }
  `,
  LeftWrapper: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    & svg {
      height: 3.6rem;
      width: 3.6rem;
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
    color: ${ ({theme}) => theme.colors.orange95};
  `,
}
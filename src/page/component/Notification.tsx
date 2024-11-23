import styled from "styled-components";
import noticeIcon from "@image/component/notice.svg?react"
import infoIcon from "@image/component/message-alert.svg?react"

export interface NotificationProps {
  variant?: "info" | "notice";
  LeftIcon?: React.FunctionComponent<React.ComponentProps<"svg">>;
  subtitle?: string;
  children: React.ReactNode;
}

const Notification = ({
  variant = "info",
  LeftIcon = (variant==="info" ? infoIcon : noticeIcon),
  ...props
}: NotificationProps) => {
  return(
    <St.Notification $variant={variant}>
      <St.LeftWrapper>
        {LeftIcon && <LeftIcon/>}
        <St.Titles>
          {props.children}
          {props.subtitle &&
            <St.Subtitle>{props.subtitle}</St.Subtitle>
          }
        </St.Titles>
      </St.LeftWrapper>
    </St.Notification>
  )
}

export default Notification;

const St = {
  Notification: styled.div<{
    $variant: NotificationProps["variant"];
    }>`
    width: 100%;
    padding: 1.6rem 1.8rem;
    border-radius: 1.6rem;
    
    color: ${({theme}) => theme.colors.gray500};
    path { /* Left Icon Color */
                stroke: ${({theme}) => theme.colors.gray500};
            }
    /* variant별 색상 */
    ${(props) => {
      switch (props.$variant) {
        case "notice":
          return`
            background: ${props.theme.colors.orange95};
          `
        case "info":
          return`
            background: transparent;
            border: 1px solid ${props.theme.colors.gray400};
          `
      }
    }}
  `,
  LeftWrapper: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    & svg {
      height: 2.4rem;
      width: 2.4rem;
    }
  `,
  Titles: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    ${ ({theme}) => theme.fonts.title_small}
  `,
  Subtitle: styled.div`
    ${ ({theme}) => theme.fonts.body_small}
    color: ${ ({theme}) => theme.colors.gray600};
  `,
}
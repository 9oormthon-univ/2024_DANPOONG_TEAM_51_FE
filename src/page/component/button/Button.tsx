import React, { ComponentProps } from 'react';
import styled from 'styled-components'

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "text";
  rightIcon?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

const Button = ({ 
  variant = "primary", 
  rightIcon = false, 
  selected = false, 
  ...props 
}: ButtonProps) => {
  return (
    <St.Button $variant={variant} $rightIcon={rightIcon} selected={selected} {...props}>
      {props.children}
      {rightIcon && <Chevron/>}
    </St.Button>
  );
};

const Chevron = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Button;

const St = {
  Button: styled.button<{
    $variant: ButtonProps["variant"];
    $rightIcon: boolean;
    selected: boolean;
  }>`
        display: flex;
        align-items: center;
        justify-content: ${props => props.$rightIcon ? "space-between" : "center"};

        width: 100%;
        padding: 1.6rem 2.4rem;
        ${({ theme }) => theme.fonts.title_medium}
        border-radius: 5.6rem;

        &:disabled {
          cursor: default;
        }
        
        // variant별, 상태별 색상 변화
        ${(props) => {
          switch (props.$variant) {
            case "primary":
              return`
                background-color: ${props.theme.colors.orange10};
                color: ${props.theme.colors.white};
                path { /* 아이콘 색상 */
                    stroke: ${props.theme.colors.white};
                  }
                &:active {
                  background-color: ${props.theme.colors.orange20};
                }
                &:disabled {
                  background-color: #361E0033;
                  color: ${props.theme.colors.gray500};
                  path {
                    stroke: ${props.theme.colors.gray500};
                  }
                }
                ${props.selected && `
                  background-color: ${props.theme.colors.orange30};
                `}
              `
            case "secondary":
              return`
               background-color: ${props.theme.colors.white};
               border: 1px ${props.theme.colors.orange70} solid;
               color: ${props.theme.colors.gray700};
               path { /* 아이콘 색상 */
                    stroke: ${props.theme.colors.gray700};
                  }
                &:active {
                  background-color: ${props.theme.colors.orange99};
                }
                &:disabled {
                  background-color: ${props.theme.colors.gray25};
                  border-color: ${props.theme.colors.gray400};
                  color: ${props.theme.colors.gray400};
                  path {
                    stroke: ${props.theme.colors.gray400};
                  }
                }
                ${props.selected && `
                  background-color: #FFC06E66;
                `}
              `
            case "text":
              return`
               background-color: transparent;
               color: ${props.theme.colors.gray700};
               path { /* 아이콘 색상 */
                    stroke: ${props.theme.colors.gray700};
                  }
                &:active {
                  background-color: ${props.theme.colors.gray100};
                }
                &:disabled {
                  background-color: transparent;
                  color: ${props.theme.colors.gray400};
                  path {
                    stroke: ${props.theme.colors.gray400};
                  }
                }
              `
          }
        }}
    `,
  Image: styled.img`
    height: 100%;
  `
}

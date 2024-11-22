import styled from 'styled-components'

interface BadgeProps {
  variant?: "badge-orange" | "badge-pink" | "badge-default";
  children: React.ReactNode;
}

const Badge = ({ 
  variant = "badge-default", 
  ...props 
}: BadgeProps) => {
  return (
    <St.Badge $variant={variant} {...props}>
      {props.children}
    </St.Badge>
  );
};

export default Badge;

const St = {
  Badge: styled.span<{
    $variant: BadgeProps["variant"];
  }>`
    height: 3.2rem;
    padding: 0.8rem;
    ${({ theme }) => theme.fonts.title_small}
    border-radius: 3.6rem;
    color: ${props => props.theme.colors.gray500};

    // variant별 색상 변화
    ${(props) => {
      switch (props.$variant) {
        case "badge-orange":
          return`
            background-color: ${props.theme.colors.orange95};
            border: 1px ${props.theme.colors.orange80} solid;
          `
        case "badge-pink":
          return`
            background-color: #FFECFA;
            border: 1px #FDD5F2 solid;
          `
        case "badge-default":
          return`
            background-color: transparent;
            border: 1px ${props.theme.colors.gray200} solid;
          `
      }
    }}
  `,
}

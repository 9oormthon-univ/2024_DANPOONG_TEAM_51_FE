import styled from 'styled-components';
import Button from '../component/button/Button';
import { IndexStyle } from '../../common/style/index/IndexStyle';
import tooltipTriangle from '../../common/asset/image/index/tooltip-triangle.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState("none")
  const navigate = useNavigate();
  const handleNext = () => {
    if (selectedRole==="none") {
      return;
    }
    console.log(`role=${selectedRole}`);
    navigate("/home");
  }
  return (
    <St.Wrapper>
      <St.Dummy />
      <St.ContentWrapper>
        <St.Heading>어떤 회원으로 오셨나요?</St.Heading>
        <St.Roles>
          <Button 
            variant='secondary'
            onClick={()=>setSelectedRole("멘토")}
            selected={selectedRole==="멘토"}
          >
            <Tooltip/>
            멘토
          </Button>
          <Button 
            variant='secondary' 
            onClick={()=>setSelectedRole("멘티")}
            selected={selectedRole==="멘티"}
          >
            <Tooltip up/>
            멘티
          </Button>
        </St.Roles>
      </St.ContentWrapper>
      <St.ButtonNext 
        onClick={handleNext}
        disabled={selectedRole==="none"}
      >
        다음으로
      </St.ButtonNext>
    </St.Wrapper>
  )
}

export default SignUp;

const Tooltip = ({up=false}: {
  up?: boolean;
}) => {
  return (
    <St.Tooltip $up={up}>
      <St.TooltipBox>
        소프트 스킬을
        <St.orange50>{up?" 배우는 ":" 나누는 "}</St.orange50>
        역할이에요!
      </St.TooltipBox>
      <St.Tip $up={up} src={tooltipTriangle} alt=""/>
    </St.Tooltip>
  )
}

const St = {
  ...IndexStyle,
  ButtonNext: styled(Button)`
    margin-bottom: 5.6rem;  
  `,
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 136px;
    width: 100%;
  `,
  Roles: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  `,
  TooltipBox: styled.div`
    padding: 8px;
    background-color: white;
    border-radius: 8px;
    ${({ theme }) => theme.fonts.title_small}
    word-break: keep-all;
  `,
  Tooltip: styled.div<{$up: boolean;}>`
    position: absolute;
    transform: translateY(${props => props.$up ? "6.7rem" : "-6.7rem"});
  `,
  orange50: styled.span`
    color: ${({ theme }) => theme.colors.orange50};
  `,
  Tip: styled.img<{$up:boolean;}>`
    height: 8.75px;
    position: absolute;
    left: 0;

    ${props => props.$up ? 
      `-webkit-transform: scaleY(-1);
      transform: scaleY(-1);
      top: -6.25px;` : 
      `bottom: -6.25px;`
    }
  `
}
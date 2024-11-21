import styled from 'styled-components';
import Button from '../component/button/Button';
import Logo from '@image/index/logo-title.png';
import iconKakao from '@image/index/icon-kakao.svg';
import { IndexStyle } from '../../common/style/index/IndexStyle';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/signup");
  }
  return (
    <St.Wrapper>
      <St.Dummy/>
      <St.LogoWrapper>
        <St.Logo src={Logo} alt="소프트하게 말하는 법, Cone" />
      </St.LogoWrapper>
      <St.ButtonKakao onClick={handleLogin}>
        <img src={iconKakao} alt="" />
        카카오로 3초만에 로그인하기
      </St.ButtonKakao>
    </St.Wrapper>
  )
}

export default Index;

const St = {
  ...IndexStyle,
  ButtonKakao: styled(Button)`
    margin-bottom: 5.6rem;
    gap: 8px;
    background-color: #FEE500;
    color: #1F1F1F;
    border: 1px #361E00 solid;
    &:active {
                background-color: #fee50092;
              }
  `,
  LogoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Logo: styled.img`
    height: 11rem;
  `,
}
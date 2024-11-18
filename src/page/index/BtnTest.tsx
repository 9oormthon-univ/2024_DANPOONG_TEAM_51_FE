import styled from 'styled-components';
import Button from '../component/button/Button';

const Index = () => {
  return (
    <St.BtnTestWrapper>
      <St.HomeTitle>테스트</St.HomeTitle>
      <Button >확인</Button>
      <Button rightIcon >확인</Button>
      <Button rightIcon selected >확인</Button>
      <Button rightIcon disabled >확인</Button>
      <Button variant='secondary'>확인</Button>
      <Button variant='secondary' rightIcon >확인</Button>
      <Button variant='secondary' rightIcon selected >확인</Button>
      <Button variant='secondary' rightIcon disabled >확인</Button>
      <Button variant='text'>확인</Button>
      <Button variant='text' rightIcon >확인</Button>
      <Button variant='text' rightIcon selected >확인</Button>
      <Button variant='text' rightIcon disabled >확인</Button>
    </St.BtnTestWrapper>
  );
};

export default Index;

const St = {
  BtnTestWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;

    width: 30rem;
    padding: 5rem;
  `,
  HomeTitle: styled.h1`
    ${({ theme }) => theme.fonts.display_medium};
  `,
};
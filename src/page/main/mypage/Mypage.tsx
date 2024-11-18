import styled from 'styled-components';

const Mypage = () => {
  return (
    <>
      <St.HomeWrapper>
        <div>Mypage</div>
      </St.HomeWrapper>
    </>
  );
};

const St = {
  HomeWrapper: styled.div`
    display: flex;

    width: 100%;
    height: 100%;
    background-color: #444444;
  `,
}

export default Mypage;
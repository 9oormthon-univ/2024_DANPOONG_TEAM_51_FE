import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <St.HomeWrapper>
        <div>Home</div>
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

export default Home;
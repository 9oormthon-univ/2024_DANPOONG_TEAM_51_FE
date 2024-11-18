import styled from 'styled-components';

import TabBar from './component/TabBar';

const Main = () => {
  return (
    <>
      <St.TabBarWrapper>
        <TabBar />
      </St.TabBarWrapper>
    </>
  );
};

const St = {
  TabBarWrapper: styled.div`
    position: fixed;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 1000; 
  `,
}

export default Main;
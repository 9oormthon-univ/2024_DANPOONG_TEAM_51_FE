import { useEffect } from 'react';
import { ThemeProvider, styled } from 'styled-components';

import GlobalStyle from './common/style/GlobalStyle';
import theme from './common/style/theme';
import { useLocation, Outlet } from 'react-router-dom';

import TabBar from './page/main/component/TabBar';

const hiddenPaths = ['/login', '/chatting/example']; // 예시 path

function App() {
  const { pathname } = useLocation();

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const maxWidth = Math.min(393, windowWidth);
    document.documentElement.style.setProperty('--app-max-width', `${maxWidth}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Outlet />
        {!hiddenPaths.includes(pathname) && (
          <St.TabBarWrapper>
            <TabBar />
          </St.TabBarWrapper>
        )} 
    </ThemeProvider>
  );
}

export default App;

const St = {
  TabBarWrapper: styled.div`
    display: flex;
    overflow: hidden;
    z-index: 1000;
    width: 100%;
    max-width: var(--app-max-width); 
    height: 95px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: stretch;
  `,
}

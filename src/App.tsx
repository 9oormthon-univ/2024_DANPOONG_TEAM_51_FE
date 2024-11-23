import { useEffect } from 'react';
import { ThemeProvider, styled } from 'styled-components';

import GlobalStyle from './common/style/GlobalStyle';
import theme from './common/style/theme';
import { useLocation, Outlet } from 'react-router-dom';

import TabBar from './page/main/component/TabBar';

const hiddenPaths = [
  '/index',
  '/login',
  '/signup',
  '/voice-call',
  '/chatting/example',
];

function App() {
  const { pathname } = useLocation();

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const maxWidth = Math.min(393, windowWidth);
    document.documentElement.style.setProperty(
      '--app-max-width',
      `${maxWidth}px`
    );
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
      <St.AppWrapper $isTabBar={!hiddenPaths.includes(pathname)}>
        <Outlet />
      </St.AppWrapper>
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

  AppWrapper: styled.div<{ $isTabBar: boolean }>`
    max-width: var(--app-max-width);
    width: 100%;
    // height: 100%;
    height: ${(props) => (props.$isTabBar ? `calc(100vh - 95px)` : `100vh`)};

    position: absolute;
    transform: translateX(-50%);
    overflow-y: auto;
    overflow-x: hidden;

    background-image: url('/bg-gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `,
};

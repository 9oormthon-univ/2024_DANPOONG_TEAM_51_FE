// Router.tsx
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import ChatPage from './page/main/chat/Chat';
import HomePage from './page/main/home/Home';
import MyPage from './page/main/mypage/Mypage';
import ChattingExample from './page/main/chat/component/chatting/ChattingExample';

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<HomePage />} />   
            <Route path="chat" element={<ChatPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="chatting/example" element={<ChattingExample />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

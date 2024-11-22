// Router.tsx
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import ChatPage from './page/main/chat/Chat';
import HomePage from './page/main/home/Home';
import MyPage from './page/main/mypage/Mypage';
import Index from './page/index/Index';
import SignUp from './page/index/SignUp';
import ChattingPage from '@main/chat/chatting/ChattingPage';
import VoiceCall from './page/voicecall/VoiceCall';

import ComponentsTest from './page/component/ComponetsTest';
import KakaoCallback from '@/page/index/KakaoCallback';

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='home' element={<HomePage />} />
            <Route path='chat' element={<ChatPage />} />
            <Route path='mypage' element={<MyPage />} />
            <Route path='index' element={<Index />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='chatting/example' element={<ChattingPage />} />
            <Route path='voice-call' element={<VoiceCall />} />

            <Route path='components-test' element={<ComponentsTest />} />
            <Route path='/oauth' element={<KakaoCallback />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

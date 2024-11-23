import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postSocialLogin } from '@shared/api/login';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSocialLogin = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get('code');
        console.log('Authorization Code:', code);

        if (!code) {
          console.error('Authorization code not found.');
          return;
        }

        const platformType = 'KAKAO';
        const response = await postSocialLogin({ platformType, code });
        console.log('Login Success:', response);

        if (response.role === 'GUEST') {
          navigate('/signup');
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('Login Failed:', error);
      }
    };

    handleSocialLogin();
  }, [navigate]);

  return <></>;
};

export default KakaoCallback;

import { css, DefaultTheme } from 'styled-components';

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  gray25: '#FAFAFA',
  gray50: '#F5F5F5',
  gray100: '#F0F0F0',
  gray200: '#D9D9D9',
  gray300: '#BFBFBF',
  gray400: '#8C8C8C',
  gray500: '#595959',
  gray600: '#434343',
  gray700: '#262626',
  gray800: '#1F1F1F',
  gray900: '#141414',

  orange10: '#361E00',
  orange20: '#663A00',
  orange30: '#9C5800',
  orange40: '#D47800',
  orange50: '#FF9200',
  orange60: '#FFA938',
  orange70: '#FFC06E',
  orange80: '#FFD49C',
  orange90: '#FEE6C6',
  orange95: '#FEF4E6',
  orange99: '#FFFCF7',

  white50: '#80FFFFFF',
};

const gradients = {
  pinktoyellow: 'linear-gradient(to right, #FDD5F2, #FBE7CE 70%)',
  yellowtopink: 'linear-gradient(to right, #FBE7CE 50%, #FDD5F2)',
}

const fonts = {
  display_large: css`
    font-family: 'Pretendard-Bold';
    font-size: 4rem;
    font-weight: 700;
    line-height: 64px;
  `,
  display_medium: css`
    font-family: 'Pretendard';
    font-size: 4rem;
    font-weight: 700;
    line-height: 64px;
  `,
  title_extralarge: css`
    font-family: 'Pretendard';
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 44px;
  `,
  title_large: css`
    font-family: 'Pretendard';
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 28px;
  `,
  title_medium: css`
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 24px;
  `,
  title_small: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 14px;
  `,
  body_large: css`
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 24px;
  `,
  body_medium: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 20px;
  `,
  body_small: css`
    font-family: 'Pretendard';
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 16px;
  `,
  chatting_medium: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 16px;
  `,
};

const theme: DefaultTheme = { colors, gradients, fonts };
export default theme;

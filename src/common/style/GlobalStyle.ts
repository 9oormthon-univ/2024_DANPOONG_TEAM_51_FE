import { createGlobalStyle, css } from 'styled-components';

export const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;

    font: inherit;
    vertical-align: baseline;

    border: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100dvh;

    font-family: Pretendard, sans-serif;
    font-size: 1.6rem;

    background-color: #fff;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  * {
    scrollbar-width: none;
    box-sizing: border-box;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    -webkit-tap-highlight-color: transparent;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  button {
    cursor: pointer;

    padding: 0;

    font: inherit;
    color: inherit;

    appearance: none;
    border: none;
  }
`;

export const GlobalStyle = createGlobalStyle`

${reset}
  @font-face {
    font-family: Pretendard;
    font-weight: regular;
    src: url('../asset/font/Pretendard-Regular.subset.woff2') format('font-woff2');
  } 

  @font-face {
    font-family: Pretendard;
    font-weight: bold;
    src: url('../asset/font/Pretendard-Bold.subset.woff2') format('font-woff2');
  }
`;

export default GlobalStyle;
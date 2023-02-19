import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: -apple-system, "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberations Sans", sans-serif;
    font-weight: 400; 
    white-space: nowrap;
    font-size: 11px; 
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: #f7f8f8;
  }

  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  // 미디어 쿼리
  // 모바일(), 타블렛, PC
`;

export default GlobalStyles;

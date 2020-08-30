import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F8F8FA;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Nunito Sans', sans-serif;
  }

  p, strong, span, h1, h2 {
    color: #131315;
  }

  #root {
    max-width: 1260px;
    margin: 0 auto;
    padding: 0px 20px;
  }

  button {
    cursor: pointer;
  }
`;

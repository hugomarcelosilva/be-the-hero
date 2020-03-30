import { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    transition: 0.5s;
  }

  body {
    font: 400 14px Roboto, sans-serif;
    background: ${({ theme }) => theme.colors.secundary};
    -webkit-font-smoothing: antialiased;
  }

  a, h1{
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  button,
  textarea {
    font: 400 18px Roboto, sans-serif;
    background: ${({ theme }) => lighten(0.06, theme.colors.secundary)};
  }

  button {
    cursor: pointer;
  }
`;

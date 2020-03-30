import React from 'react';
import ButterToast, { POS_TOP, POS_RIGHT } from 'butter-toast';
import { ThemeProvider } from 'styled-components';
import usePersistedState from './utils/usePersistedState';

import GlobalStyle from './styles/global';

import Routes from './routes';

import SetTheme from './components/SetTheme';
import Light from './styles/themes/Light';

function App() {
  const [theme, setTheme] = usePersistedState('theme', Light);
  return (
    <ThemeProvider theme={theme}>
      <SetTheme setTheme={setTheme} />
      <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}

export default App;

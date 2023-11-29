import styled from '@emotion/styled';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useCustomTheme from './styles/theme';
import { useSelector } from 'react-redux';

import ToggleTheme from './components/ToggleTheme';

const App = () => {
  const { mode } = useSelector((state) => state.localStorage);

  return (
    <ThemeProvider theme={useCustomTheme(mode)}>
      <CssBaseline />
      <Wrapper>
        <ToggleTheme />
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default App;

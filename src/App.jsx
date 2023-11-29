import styled from '@emotion/styled';
import { Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import theme from './styles/theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <Button
            variant='contained'
            color='primary'>
            Hello World
          </Button>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default App;

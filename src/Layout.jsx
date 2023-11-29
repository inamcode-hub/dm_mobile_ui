import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useCustomTheme from './styles/theme';
import LoadingBar from './components/LodingBar';

const Layout = () => {
  const { mode } = useSelector((state) => state.localStorage);
  return (
    <ThemeProvider theme={useCustomTheme(mode)}>
      <CssBaseline />
      <LoadingBar />
      <Outlet />
    </ThemeProvider>
  );
};

export default Layout;

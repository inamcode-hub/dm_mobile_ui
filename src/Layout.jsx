import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useCustomTheme from './styles/theme';
const Layout = () => {
  const { mode } = useSelector((state) => state.localStorage);
  return (
    <ThemeProvider theme={useCustomTheme(mode)}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};

export default Layout;

import { createTheme } from '@mui/material';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#4a8bff' : '#1f3660',
      },
      secondary: {
        main: '#58a645',
      },

      background: {
        default: mode === 'dark' ? '#121212' : '#f0f2f5',
        paper: mode === 'dark' ? '#1f3660' : '#ffffff',
      },
    },
  });
};

const useCustomTheme = (theme) => {
  return getTheme(theme);
};

export default useCustomTheme;

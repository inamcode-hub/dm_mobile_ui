import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

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
        default: mode === 'dark' ? grey[900] : '#f0f2f5',
        paper: mode === 'dark' ? grey[900] : '#ffffff',
      },
    },
  });
};

const useCustomTheme = (theme) => {
  return getTheme(theme);
};

export default useCustomTheme;

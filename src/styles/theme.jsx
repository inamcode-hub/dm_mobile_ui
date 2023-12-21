import { createTheme } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#32539a' : '#213966',
      },
      secondary: {
        main: '#58a645',
      },

      background: {
        default: mode === 'dark' ? grey[900] : '#f0f2f5',
        paper: mode === 'dark' ? '#333' : '#ffffff',
      },
    },
  });
};

const useCustomTheme = (theme) => {
  return getTheme(theme);
};

export default useCustomTheme;

import { createTheme } from '@mui/material';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
    },
  });
};

const useCustomTheme = (theme) => {
  return getTheme(theme);
};

export default useCustomTheme;

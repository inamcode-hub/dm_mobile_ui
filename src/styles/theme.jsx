import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react';

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
